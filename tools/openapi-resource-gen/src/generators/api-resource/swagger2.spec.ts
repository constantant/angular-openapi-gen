import { describe, it, expect } from 'vitest';
import { isSwagger2, pushDownMediaTypes, upgradeSwagger2 } from './swagger2';

const spec = () => ({
  swagger: '2.0',
  info: { title: 't', version: '1' },
  produces: ['application/json'],
  consumes: ['application/json'],
  paths: {
    '/img': { get: { operationId: 'img', produces: ['image/png'], responses: { 200: { description: 'ok', schema: { type: 'file' } } } } },
    '/obj': { get: { operationId: 'obj', responses: { 200: { description: 'ok', schema: { type: 'object' } } } } },
    '/txt': { get: { operationId: 'txt', produces: ['text/plain'], responses: { 200: { description: 'ok', schema: { type: 'string' } } } } },
    '/multi': { get: { operationId: 'multi', produces: ['application/json', 'application/xml'], responses: { 200: { description: 'ok', schema: { type: 'object' } } } } },
    '/put': {
      parameters: [{ name: 'shared', in: 'query', type: 'string' }],
      put: { operationId: 'put', parameters: [{ name: 'b', in: 'body', schema: { type: 'object' } }], responses: { 200: { description: 'ok' } } },
    },
  },
});

describe('isSwagger2', () => {
  it.each([['2.0', true], ['2', true], ['1.2', false], [undefined, false]])('swagger: %s → %s', (swagger, expected) => {
    expect(isSwagger2({ swagger })).toBe(expected);
  });
  it('an OpenAPI 3 document is not Swagger 2', () => {
    expect(isSwagger2({ openapi: '3.0.3' })).toBe(false);
  });
});

describe('pushDownMediaTypes', () => {
  it('copies the global lists into operations that lack their own, and removes the globals', () => {
    const out = pushDownMediaTypes(spec()) as ReturnType<typeof spec> & Record<string, unknown>;
    expect(out['produces']).toBeUndefined();
    expect(out['consumes']).toBeUndefined();
    const paths = out.paths as Record<string, Record<string, { produces?: string[]; consumes?: string[] }>>;
    expect(paths['/obj']['get'].produces).toEqual(['application/json']);
    expect(paths['/obj']['get'].consumes).toEqual(['application/json']);
    expect(paths['/put']['put'].consumes).toEqual(['application/json']);
  });

  it("leaves an operation's own list untouched", () => {
    const paths = pushDownMediaTypes(spec())['paths'] as Record<string, Record<string, { produces?: string[] }>>;
    expect(paths['/img']['get'].produces).toEqual(['image/png']);
    expect(paths['/multi']['get'].produces).toEqual(['application/json', 'application/xml']);
  });

  it('does not touch path-level parameters or non-operation keys', () => {
    const paths = pushDownMediaTypes(spec())['paths'] as Record<string, Record<string, unknown>>;
    expect(paths['/put']['parameters']).toEqual([{ name: 'shared', in: 'query', type: 'string' }]);
  });

  it('does not mutate its input', () => {
    const input = spec();
    pushDownMediaTypes(input);
    expect(input).toEqual(spec());
  });

  it('is a no-op copy when there are no globals', () => {
    const input = { swagger: '2.0', paths: { '/a': { get: { responses: {} } } } };
    expect(pushDownMediaTypes(input)).toEqual(input);
  });

  it('ignores a global that is not an array and tolerates a missing paths object', () => {
    expect(pushDownMediaTypes({ swagger: '2.0', produces: 'application/json' })).toEqual({ swagger: '2.0', produces: 'application/json' });
  });
});

describe('upgradeSwagger2 (real @scalar/openapi-upgrader)', () => {
  const content = (doc: Record<string, unknown>, p: string): string[] => {
    const paths = doc['paths'] as Record<string, Record<string, { responses: Record<string, { content?: Record<string, unknown> }> }>>;
    return Object.keys(paths[p]['get'].responses['200'].content ?? {});
  };

  it('produces an OpenAPI 3.x document', async () => {
    expect(String((await upgradeSwagger2(spec()))['openapi'])).toMatch(/^3\./);
  });

  it("honours an operation's own `produces` even when a global one exists (the upgrader gets this wrong on its own)", async () => {
    const doc = await upgradeSwagger2(spec());
    expect(content(doc, '/img')).toEqual(['image/png']);
    expect(content(doc, '/txt')).toEqual(['text/plain']);
    expect(content(doc, '/multi')).toEqual(['application/json', 'application/xml']);
    expect(content(doc, '/obj')).toEqual(['application/json']);
  });

  it('does not mutate the spec it is given', async () => {
    const input = spec();
    await upgradeSwagger2(input);
    expect(input).toEqual(spec());
  });

  it('derives servers, moves definitions and keeps shared parameters', async () => {
    const doc = await upgradeSwagger2({
      swagger: '2.0',
      info: { title: 't', version: '1' },
      host: 'api.test',
      basePath: '/v2',
      schemes: ['https'],
      parameters: { Limit: { name: 'limit', in: 'query', type: 'integer' } },
      paths: { '/a': { get: { operationId: 'a', parameters: [{ $ref: '#/parameters/Limit' }], responses: { 200: { description: 'ok', schema: { $ref: '#/definitions/A' } } } } } },
      definitions: { A: { type: 'object', properties: { id: { type: 'integer' } } } },
    });
    expect(doc['servers']).toEqual([{ url: 'https://api.test/v2' }]);
    const components = doc['components'] as { schemas: Record<string, unknown>; parameters: Record<string, unknown> };
    expect(Object.keys(components.schemas)).toEqual(['A']);
    expect(Object.keys(components.parameters)).toEqual(['Limit']);
  });
});
