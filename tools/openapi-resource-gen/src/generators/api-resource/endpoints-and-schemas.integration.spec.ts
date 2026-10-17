/**
 * Integration test for what tools outside the app read: the richer mocks.manifest.json, the
 * framework-free mocks.endpoints.ts with its type maps, the per-status XxxErrors aliases, and
 * api.schemas.json (--emitSchemas). The real generator and parser run on a spec with errors on
 * several statuses, a shared response, a 204, a circular schema and nullable fields; the output is
 * compiled with the TypeScript compiler, and real values are validated against the emitted schemas.
 */
import { describe, it, expect, afterAll, vi } from 'vitest';
import { Validator, type Schema } from '@cfworker/json-schema';
import { integrationWorkspace } from './integration-helpers';

// The check that @constantant/openapi-resource-mocks is installed is covered in ensure-package.spec.ts.
vi.mock('./ensure-package', () => ({ ensurePackageInstalled: vi.fn() }));

const SPEC = JSON.stringify({
  openapi: '3.0.3',
  info: { title: 'Shop', version: '1' },
  security: [{ bearer: [] }],
  components: {
    securitySchemes: { bearer: { type: 'http', scheme: 'bearer' } },
    schemas: {
      Category: {
        type: 'object',
        required: ['name'],
        properties: { name: { type: 'string' }, parent: { $ref: '#/components/schemas/Category' } },
      },
      Item: {
        type: 'object',
        required: ['id', 'category'],
        properties: {
          id: { type: 'string' },
          note: { type: 'string', nullable: true },
          // how OAS 3.0 makes a reference nullable, and a nullable enum
          parent: { allOf: [{ $ref: '#/components/schemas/Category' }], nullable: true },
          state: { type: 'string', enum: ['new', 'old'], nullable: true },
          category: { $ref: '#/components/schemas/Category' },
        },
      },
      Problem: { type: 'object', required: ['title'], properties: { title: { type: 'string' } } },
      IdentityError: { type: 'object', required: ['code'], properties: { code: { type: 'string' } } },
    },
    responses: {
      NotFound: { description: 'not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Problem' } } } },
    },
  },
  paths: {
    '/items/{id}': {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      get: {
        operationId: 'getItem',
        tags: ['items'],
        parameters: [
          { name: 'lang', in: 'query', schema: { type: 'string' } },
          { name: 'X-Trace', in: 'header', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'ok', content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' } } } },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        operationId: 'saveItem',
        tags: ['items'],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' } } } },
        responses: {
          '204': { description: 'saved' },
          '400': {
            description: 'invalid',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/IdentityError' } } } },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
  },
});

const PROBE = `
import { ENDPOINTS, SPEC_ID, type EndpointKey, type EndpointResponses, type EndpointErrors, type EndpointBodies, type EndpointParams } from './out/mocks.endpoints';
import type { GetItemErrors } from './out';

export const keys: EndpointKey[] = ['GET_ITEM', 'SAVE_ITEM'];
export const id: 'shop' = SPEC_ID;
export const method: 'put' = ENDPOINTS.SAVE_ITEM.method;
export const path: '/items/{id}' = ENDPOINTS.GET_ITEM.path;

const item: EndpointResponses['GET_ITEM'] = { id: '1', note: null, category: { name: 'a', parent: { name: 'b' } } };
const nothing: EndpointResponses['SAVE_ITEM'] = undefined;
const badRequest: EndpointErrors['SAVE_ITEM']['400'] = [{ code: 'PasswordMismatch' }];
const notFound: EndpointErrors['GET_ITEM'][404] = { title: 'gone' };
const notFoundToo: GetItemErrors['404'] = notFound;
const body: EndpointBodies['SAVE_ITEM'] = item;
const params: EndpointParams['GET_ITEM'] = { lang: 'it' };
// @ts-expect-error a status the spec does not document
const undocumented: EndpointErrors['GET_ITEM']['500'] = { title: 'x' };
// @ts-expect-error GET takes no body
const noBody: EndpointBodies['GET_ITEM'] = item;
export { item, nothing, badRequest, notFoundToo, body, params, undocumented, noBody };
`;

const { generateAndCompile, cleanup } = integrationWorkspace('oas-endpoints-integration');
afterAll(cleanup);

describe('mocks.endpoints.ts, the manifest and api.schemas.json', () => {
  it('describes every endpoint for Node tools, with type maps that compile', async () => {
    const ws = await generateAndCompile(
      'all',
      { fileName: 'shop.json', text: SPEC },
      { includeMocks: true, specId: 'shop', emitSchemas: true, clientType: 'httpClient', providedIn: 'root' },
      PROBE,
    );

    expect(ws.diagnostics).toEqual([]);

    // Node-safe: only type imports, which are erased at runtime.
    const endpoints = ws.read('mocks.endpoints.ts');
    expect(endpoints).not.toMatch(/^import (?!type )/m);
    expect(endpoints).toContain(`import type { GetItemResponse, GetItemErrors, GetItemParams } from './items/get-item.token';`);

    const manifest = JSON.parse(ws.read('mocks.manifest.json'));
    const getItem = manifest.mocks.find((m: { tokenName: string }) => m.tokenName === 'GET_ITEM');
    expect(getItem).toEqual({
      tokenName: 'GET_ITEM',
      operationId: 'getItem',
      path: '/items/{id}',
      method: 'get',
      tag: 'items',
      responseType: 'json',
      parameters: [
        { name: 'id', in: 'path', required: true },
        { name: 'lang', in: 'query', required: false },
        { name: 'X-Trace', in: 'header', required: true },
      ],
      responses: [
        { status: '200', mediaTypes: ['application/json'] },
        { status: '404', mediaTypes: ['application/json'] },
      ],
      security: [['bearer']],
    });
    const saveItem = manifest.mocks.find((m: { tokenName: string }) => m.tokenName === 'SAVE_ITEM');
    expect(saveItem.requestBody).toEqual({ mediaType: 'application/json', required: true });
    expect(saveItem.responses.map((r: { status: string }) => r.status)).toEqual(['204', '400', '404']);
  }, 120_000);

  it('emits schemas that validate real values, refs and circular schemas included', async () => {
    const ws = await generateAndCompile(
      'schemas',
      { fileName: 'shop.json', text: SPEC },
      { includeMocks: true, specId: 'shop', emitSchemas: true },
    );
    const doc = JSON.parse(ws.read('api.schemas.json'));
    const validate = (pointer: string, value: unknown) =>
      new Validator({ ...doc, $ref: pointer } as Schema, '2020-12', false).validate(value).valid;

    const ok = '#/operations/GET_ITEM/responses/200/content/application~1json/schema';
    expect(validate(ok, { id: '1', note: null, category: { name: 'a', parent: { name: 'b' } } })).toBe(true);
    // nullable: true became a type array, so null passes and a number does not.
    expect(validate(ok, { id: '1', note: 3, category: { name: 'a' } })).toBe(false);
    expect(validate(ok, { id: '1' })).toBe(false);
    // nullable without a type (allOf + nullable) and a nullable enum accept null, and still check other values
    const item = { id: '1', category: { name: 'a' } };
    expect(validate(ok, { ...item, parent: null, state: null })).toBe(true);
    expect(validate(ok, { ...item, parent: { name: 'p' }, state: 'old' })).toBe(true);
    expect(validate(ok, { ...item, parent: { name: 3 } })).toBe(false);
    expect(validate(ok, { ...item, state: 'gone' })).toBe(false);
    // A response given as a $ref to components.responses is followed.
    expect(validate('#/operations/GET_ITEM/responses/404/content/application~1json/schema', { title: 'gone' })).toBe(true);
    expect(validate('#/operations/SAVE_ITEM/responses/400/content/application~1json/schema', [{ code: 'X' }])).toBe(true);
    expect(validate('#/operations/SAVE_ITEM/responses/400/content/application~1json/schema', { code: 'X' })).toBe(false);
    expect(validate('#/operations/SAVE_ITEM/requestBody/content/application~1json/schema', { id: '1', category: { name: 'a' } })).toBe(true);
    // A 204 is listed, with no content.
    expect(doc.operations.SAVE_ITEM.responses['204']).toEqual({ content: {} });
    expect(doc.operations.SAVE_ITEM.requestBody.required).toBe(true);
  }, 120_000);

  it('removes the files when their options are turned off', async () => {
    const ws = await generateAndCompile('off', { fileName: 'shop.json', text: SPEC }, {});
    expect(ws.exists('mocks.endpoints.ts')).toBe(false);
    expect(ws.exists('api.schemas.json')).toBe(false);
  }, 120_000);
});
