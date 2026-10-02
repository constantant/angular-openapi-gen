/**
 * Integration test for `readWriteMarkers`: runs the real generator and the real parser (no mocks) on
 * a spec with readOnly / writeOnly properties, then COMPILES the output with the TypeScript compiler.
 * The feature is about types, so string assertions on the emitted code can't prove it; probes with
 * `@ts-expect-error` do. A control run without the flag must fail the same probes.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { apiResourceGenerator } from './generator';

const { FsTree, flushChanges } = require('nx/src/generators/tree') as typeof import('nx/src/generators/tree');

const SPEC = `
openapi: 3.0.3
info: { title: Users, version: '1' }
paths:
  /users:
    get:
      operationId: listUsers
      tags: [users]
      responses:
        '200': { description: ok, content: { application/json: { schema: { type: array, items: { $ref: '#/components/schemas/User' } } } } }
    post:
      operationId: createUser
      tags: [users]
      requestBody: { content: { application/json: { schema: { $ref: '#/components/schemas/User' } } } }
      responses:
        '201': { description: created, content: { application/json: { schema: { $ref: '#/components/schemas/User' } } } }
components:
  schemas:
    Profile:
      type: object
      required: [created, bio]
      properties:
        created: { type: string, readOnly: true }
        bio: { type: string }
    User:
      type: object
      required: [id, name, password, profile]
      properties:
        id: { type: integer, readOnly: true }
        name: { type: string }
        password: { type: string, writeOnly: true }
        profile: { $ref: '#/components/schemas/Profile' }
`;

const PROBE = `
import type { CreateUserBody, CreateUserResponse, ListUsersResponse } from './out';

export const okBody: CreateUserBody = { name: 'a', password: 'p', profile: { bio: 'b' } };
// @ts-expect-error a readOnly property is not accepted on a request
export const badBody: CreateUserBody = { id: 1, name: 'a', password: 'p', profile: { bio: 'b' } };
// @ts-expect-error ...including a nested one
export const badNested: CreateUserBody = { name: 'a', password: 'p', profile: { bio: 'b', created: 'x' } };
// @ts-expect-error other required properties stay required
export const missing: CreateUserBody = { password: 'p', profile: { bio: 'b' } };

export const okResponse: CreateUserResponse = { id: 1, name: 'a', profile: { bio: 'b', created: 'x' } };
// @ts-expect-error a writeOnly property is not part of a response
export const badResponse: CreateUserResponse = { id: 1, name: 'a', password: 'p', profile: { bio: 'b', created: 'x' } };
export const okList: ListUsersResponse = [{ id: 1, name: 'a', profile: { bio: 'b', created: 'x' } }];
// @ts-expect-error array items drop writeOnly properties too
export const badList: ListUsersResponse = [{ id: 1, name: 'a', password: 'p', profile: { bio: 'b', created: 'x' } }];
`;

// Compile inside node_modules/.cache so `@angular/*` and `rxjs` resolve by walking up, with no
// path mapping; the directory is removed afterwards.
const repoRoot = path.resolve(__dirname, '../../../../..');
const cacheRoot = path.join(repoRoot, 'node_modules', '.cache', 'oarg-read-write-markers-test');

async function generateAndCompile(name: string, options: Record<string, unknown>): Promise<string[]> {
  const root = path.join(cacheRoot, name);
  fs.rmSync(root, { recursive: true, force: true });
  fs.mkdirSync(root, { recursive: true });
  fs.writeFileSync(path.join(root, 'spec.yaml'), SPEC);
  fs.writeFileSync(path.join(root, 'tsconfig.base.json'), JSON.stringify({ compilerOptions: { paths: {} } }));
  fs.writeFileSync(path.join(root, 'package.json'), '{"name":"ws"}');
  fs.writeFileSync(path.join(root, 'probe.ts'), PROBE);

  const previous = process.cwd();
  process.chdir(root);
  try {
    const tree = new FsTree(root, false);
    await apiResourceGenerator(tree, { specPath: 'spec.yaml', outputDir: 'out', baseUrlToken: 'USERS_BASE_URL', ...options } as never);
    flushChanges(root, tree.listChanges());
  } finally {
    process.chdir(previous);
  }

  const files: string[] = [];
  const walk = (dir: string): void => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.ts')) files.push(full);
    }
  };
  walk(root);

  const parsed = ts.parseJsonConfigFileContent(
    {
      compilerOptions: {
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        target: 'es2022',
        module: 'esnext',
        moduleResolution: 'bundler',
        lib: ['es2022', 'dom'],
        types: [],
      },
    },
    ts.sys,
    root,
  );
  const program = ts.createProgram(files, parsed.options);
  return ts
    .getPreEmitDiagnostics(program)
    .map((d) => `${d.file ? path.relative(root, d.file.fileName) : '?'}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`);
}

describe('readWriteMarkers (real generator + real TypeScript compile)', () => {
  afterAll(() => fs.rmSync(cacheRoot, { recursive: true, force: true }));

  it('control: without the flag the probe does NOT hold (readOnly ids are required, writeOnly ones leak)', async () => {
    const diagnostics = await generateAndCompile('control', {});
    expect(diagnostics.length).toBeGreaterThan(0);
    expect(diagnostics.join('\n')).toMatch(/Unused '@ts-expect-error'|is missing|not assignable/);
  }, 120_000);

  it('with the flag, request types drop readOnly and response types drop writeOnly — and everything compiles', async () => {
    expect(await generateAndCompile('markers', { readWriteMarkers: true })).toEqual([]);
  }, 120_000);

  it('composes with readonlyResponses, validateResponses and the httpClient flavour', async () => {
    expect(
      await generateAndCompile('combined', { readWriteMarkers: true, readonlyResponses: true, validateResponses: true }),
    ).toEqual([]);
    expect(await generateAndCompile('httpclient', { readWriteMarkers: true, clientType: 'httpClient' })).toEqual([]);
  }, 180_000);
});
