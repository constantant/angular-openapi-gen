/**
 * Integration test for Swagger 2.0 input: a realistic Swagger 2.0 document goes through the real
 * generator and parser (no mocks) and the output is compiled with the TypeScript compiler. The spec
 * deliberately has the constructs converters tend to get wrong: a global `produces` that operations
 * override, a `file` download, a multipart `formData` upload, `collectionFormat`, a body parameter,
 * shared parameters/responses, and `securityDefinitions`.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { integrationWorkspace } from './integration-helpers';

const SPEC = JSON.stringify({
  swagger: '2.0',
  info: { title: 'Shop', version: '1' },
  host: 'api.shop.test',
  basePath: '/v1',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    key: { type: 'apiKey', in: 'header', name: 'X-Key' },
    oauth: { type: 'oauth2', flow: 'implicit', authorizationUrl: 'https://a.test/auth', scopes: { read: 'read' } },
  },
  security: [{ key: [] }],
  parameters: { LimitParam: { name: 'limit', in: 'query', type: 'integer' } },
  responses: { NotFound: { description: 'not found', schema: { $ref: '#/definitions/Problem' } } },
  paths: {
    '/items': {
      get: {
        operationId: 'listItems',
        tags: ['items'],
        parameters: [
          { $ref: '#/parameters/LimitParam' },
          { name: 'ids', in: 'query', type: 'array', items: { type: 'string' }, collectionFormat: 'pipes' },
          { name: 'tags', in: 'query', type: 'array', items: { type: 'string' }, collectionFormat: 'multi' },
        ],
        responses: {
          200: { description: 'ok', schema: { type: 'array', items: { $ref: '#/definitions/Item' } } },
          404: { $ref: '#/responses/NotFound' },
        },
      },
      post: {
        operationId: 'createItem',
        tags: ['items'],
        parameters: [{ name: 'body', in: 'body', required: true, schema: { $ref: '#/definitions/Item' } }],
        responses: { 201: { description: 'created', schema: { $ref: '#/definitions/Item' } } },
      },
    },
    '/items/{id}/photo': {
      post: {
        operationId: 'uploadPhoto',
        tags: ['items'],
        consumes: ['multipart/form-data'],
        parameters: [
          { name: 'id', in: 'path', required: true, type: 'integer' },
          { name: 'caption', in: 'formData', type: 'string' },
          { name: 'file', in: 'formData', type: 'file', required: true },
        ],
        responses: { 200: { description: 'ok', schema: { $ref: '#/definitions/Item' } } },
      },
      get: {
        operationId: 'downloadPhoto',
        tags: ['items'],
        produces: ['image/png'],
        parameters: [{ name: 'id', in: 'path', required: true, type: 'integer' }],
        responses: { 200: { description: 'png', schema: { type: 'file' } } },
      },
    },
    '/items/{id}/note': {
      get: {
        operationId: 'getNote',
        tags: ['items'],
        produces: ['text/plain'],
        parameters: [{ name: 'id', in: 'path', required: true, type: 'integer' }],
        responses: { 200: { description: 'note', schema: { type: 'string' } } },
      },
    },
  },
  definitions: {
    Item: { type: 'object', required: ['name'], properties: { id: { type: 'integer', readOnly: true }, name: { type: 'string' } } },
    Problem: { type: 'object', properties: { message: { type: 'string' } } },
  },
});

const { generateAndCompile, cleanup } = integrationWorkspace('oarg-swagger2-test');

describe('Swagger 2.0 input (real generator + real TypeScript compile)', () => {
  afterAll(() => cleanup());

  it('generates a library that compiles, with the right token for each operation', async () => {
    const ws = await generateAndCompile('shop', { fileName: 'shop.json', text: SPEC }, { baseUrlToken: 'SHOP_BASE_URL' });
    expect(ws.diagnostics).toEqual([]);

    for (const f of ['list-items', 'create-item', 'upload-photo', 'download-photo', 'get-note']) {
      expect(ws.exists(`items/${f}.token.ts`)).toBe(true);
    }

    // the global `produces: json` must not win over an operation's own types
    const download = ws.read('items/download-photo.token.ts');
    expect(download).toContain('httpResource.blob');
    expect(download).toContain('export type DownloadPhotoResponse = Blob;');
    expect(ws.read('items/get-note.token.ts')).toContain('httpResource.text');

    // formData → multipart body
    expect(ws.read('items/upload-photo.token.ts')).toContain("['content']['multipart/form-data']");

    // collectionFormat: pipes → a joined query value
    const list = ws.read('items/list-items.token.ts');
    expect(list).toContain('_serializeParams');
    expect(list).toMatch(/join\(['"]\|['"]\)/);

    // the shared 404 response becomes a typed error
    expect(list).toContain('export type ListItemsError');

    // securityDefinitions → one token per scheme, applied from the global `security`
    expect(ws.exists('key.security-token.ts')).toBe(true);
    expect(ws.exists('oauth.security-token.ts')).toBe(true);
    expect(list).toContain('KEY');
  }, 120_000);

  it('also generates with the httpClient flavour', async () => {
    const ws = await generateAndCompile('shop-client', { fileName: 'shop.json', text: SPEC }, { baseUrlToken: 'SHOP_BASE_URL', clientType: 'httpClient' });
    expect(ws.diagnostics).toEqual([]);
    expect(ws.read('items/download-photo.token.ts')).toContain("responseType: 'blob'");
  }, 120_000);
});
