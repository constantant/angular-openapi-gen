/**
 * Integration test for `readWriteMarkers`: runs the real generator and the real parser (no mocks) on
 * a spec with readOnly / writeOnly properties, then COMPILES the output with the TypeScript compiler.
 * The feature is about types, so string assertions on the emitted code can't prove it; probes with
 * `@ts-expect-error` do. A control run without the flag must fail the same probes.
 */
import { integrationWorkspace } from './integration-helpers';

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

const { generateAndCompile, cleanup } = integrationWorkspace('oarg-read-write-markers-test');
const compile = async (name: string, options: Record<string, unknown>): Promise<string[]> =>
  (await generateAndCompile(name, { fileName: 'spec.yaml', text: SPEC }, { baseUrlToken: 'USERS_BASE_URL', ...options }, PROBE)).diagnostics;

describe('readWriteMarkers (real generator + real TypeScript compile)', () => {
  afterAll(() => cleanup());

  it('control: without the flag the probe does NOT hold (readOnly ids are required, writeOnly ones leak)', async () => {
    const diagnostics = await compile('control', {});
    expect(diagnostics.length).toBeGreaterThan(0);
    expect(diagnostics.join('\n')).toMatch(/Unused '@ts-expect-error'|is missing|not assignable/);
  }, 120_000);

  it('with the flag, request types drop readOnly and response types drop writeOnly — and everything compiles', async () => {
    expect(await compile('markers', { readWriteMarkers: true })).toEqual([]);
  }, 120_000);

  it('composes with readonlyResponses, validateResponses and the httpClient flavour', async () => {
    expect(
      await compile('combined', { readWriteMarkers: true, readonlyResponses: true, validateResponses: true }),
    ).toEqual([]);
    expect(await compile('httpclient', { readWriteMarkers: true, clientType: 'httpClient' })).toEqual([]);
  }, 180_000);
});
