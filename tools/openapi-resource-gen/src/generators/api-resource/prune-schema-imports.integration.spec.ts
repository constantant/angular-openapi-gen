/**
 * A token whose operation has no params, body or JSON types must not import `paths` (or anything
 * else) from schema.d it does not use: consumers compile generated libs with `noUnusedLocals`.
 */
import * as path from 'path';
import * as ts from 'typescript';
import { describe, it, expect, afterAll } from 'vitest';
import { integrationWorkspace } from './integration-helpers';
import { pruneSchemaImports } from './render-token';

const SPEC = JSON.stringify({
  openapi: '3.0.3',
  info: { title: 'Keys', version: '1' },
  paths: {
    '/key': { get: { operationId: 'getKey', responses: { '200': { description: 'ok', content: { 'text/plain': { schema: { type: 'string' } } } } } } },
    '/ping': { post: { operationId: 'ping', responses: { '204': { description: 'ok' } } } },
    '/items': {
      get: {
        operationId: 'listItems',
        parameters: [{ name: 'q', in: 'query', schema: { type: 'string' } }],
        responses: { '200': { description: 'ok', content: { 'application/json': { schema: { type: 'array', items: { type: 'string' } } } } } },
      },
    },
  },
});

const { generateAndCompile, cleanup } = integrationWorkspace('oas-prune-imports-integration');
afterAll(cleanup);

describe('schema.d imports', () => {
  it.each(['httpClient', 'httpResource'])('are left out of %s tokens that use no spec type, and the lib compiles with noUnusedLocals', async (clientType) => {
    {
      const ws = await generateAndCompile(clientType, { fileName: 'keys.json', text: SPEC }, { clientType, providedIn: 'root' });
      expect(ws.diagnostics).toEqual([]);
      expect(ws.read('default/get-key.token.ts')).not.toContain('schema.d');
      expect(ws.read('default/ping.token.ts')).not.toContain('schema.d');
      expect(ws.read('default/list-items.token.ts')).toContain(`import type { paths } from '../schema.d';`);

      const program = ts.createProgram(
        ['default/get-key.token.ts', 'default/ping.token.ts', 'default/list-items.token.ts'].map((f) => path.join(ws.root, 'out', f)),
        { strict: true, noEmit: true, skipLibCheck: true, noUnusedLocals: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, types: [] },
      );
      const unused = ts.getPreEmitDiagnostics(program).map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'));
      expect(unused).toEqual([]);
    }
  }, 120_000);
});

describe('pruneSchemaImports', () => {
  it('keeps the used names only', () => {
    const code = `import type { paths, components, Readable } from '../schema.d';\nexport type A = paths['/a'];\nexport type B = Readable<components['schemas']['B']>;\n`;
    expect(pruneSchemaImports(code)).toBe(
      `import type { paths, components, Readable } from '../schema.d';\nexport type A = paths['/a'];\nexport type B = Readable<components['schemas']['B']>;\n`,
    );
    expect(pruneSchemaImports(`import type { paths, components } from '../schema.d';\nexport type C = components['x'];\n`)).toBe(
      `import type { components } from '../schema.d';\nexport type C = components['x'];\n`,
    );
  });

  it('drops the import when nothing is used, and does not count a name inside a longer identifier', () => {
    expect(pruneSchemaImports(`import { x } from 'y';\nimport type { paths } from '../schema.d';\nconst pathsList = 1;\n`)).toBe(
      `import { x } from 'y';\nconst pathsList = 1;\n`,
    );
  });
});
