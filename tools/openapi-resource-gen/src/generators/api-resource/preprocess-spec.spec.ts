import { describe, it, expect } from 'vitest';
import {
  applyOverlay,
  deriveOperationIds,
  evaluateJsonPath,
  excludeSecuritySchemes,
  filterOperations,
  parseJsonPath,
  preprocessSpec,
} from './preprocess-spec';

type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

function spec(): Json {
  return {
    openapi: '3.0.1',
    security: [{ Bearer: [], Google: ['openid'] }, { ApiKey: [] }],
    components: {
      securitySchemes: {
        Bearer: { type: 'http', scheme: 'bearer' },
        Google: { type: 'oauth2', flows: {} },
        ApiKey: { type: 'apiKey', in: 'header', name: 'X-Api-Key' },
      },
    },
    paths: {
      '/api/pets': {
        get: { tags: ['pets'], responses: { '200': { description: 'ok' } } },
        post: { operationId: 'createPet', security: [{ ApiKey: [] }], responses: { '201': { description: 'ok' } } },
      },
      '/api/pets/{id}': {
        parameters: [{ in: 'path', name: 'id', required: true }],
        get: { responses: { '200': { description: 'ok' } } },
      },
      '/sitemap.xml': { get: { security: [], responses: { '200': { description: 'ok' } } } },
    },
  };
}

describe('parseJsonPath / evaluateJsonPath', () => {
  it('reads dots, quoted names, indexes, wildcards and descendants', () => {
    expect(parseJsonPath(`$.paths['/api/pets'].get`)).toEqual([
      { kind: 'name', name: 'paths' },
      { kind: 'name', name: '/api/pets' },
      { kind: 'name', name: 'get' },
    ]);
    const s = spec();
    expect(evaluateJsonPath(s, `$.paths["/api/pets/{id}"].parameters[0].name`).map((n) => n.value)).toEqual(['id']);
    expect(evaluateJsonPath(s, `$.paths['/api/pets'].*.operationId`).map((n) => n.value)).toEqual(['createPet']);
    expect(evaluateJsonPath(s, '$..scheme').map((n) => n.value)).toEqual(['bearer']);
    expect(evaluateJsonPath(s, '$.paths[*]')).toHaveLength(3);
  });

  it('rejects filter expressions and malformed paths with a clear message', () => {
    expect(() => parseJsonPath('$.paths[?(@.get)]')).toThrow(/not supported/);
    expect(() => parseJsonPath('paths')).toThrow(/must start with "\$"/);
    expect(() => parseJsonPath(`$.paths['/a'`)).toThrow(/unclosed/);
  });
});

describe('applyOverlay', () => {
  it('merges updates into objects, replaces arrays and primitives, and removes targets', () => {
    const s = spec();
    applyOverlay(
      s,
      {
        overlay: '1.0.0',
        actions: [
          { target: `$.paths['/api/pets'].get`, update: { operationId: 'listPets', responses: { '200': { description: 'pets' } } } },
          { target: `$.paths['/api/pets'].get.tags`, update: ['animals'] },
          { target: `$.paths['/sitemap.xml']`, remove: true },
        ],
      },
      'fix.yaml',
    );
    expect(s.paths['/api/pets'].get.operationId).toBe('listPets');
    expect(s.paths['/api/pets'].get.responses['200'].description).toBe('pets');
    // An array target gets the update appended (Overlay 1.0).
    expect(s.paths['/api/pets'].get.tags).toEqual(['pets', ['animals']]);
    expect(s.paths['/sitemap.xml']).toBeUndefined();
  });

  it('removes several array items found by one target', () => {
    const s = { openapi: '3.0.0', paths: {}, tags: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] };
    applyOverlay(s, { overlay: '1.0.0', actions: [{ target: '$.tags[*]', remove: true }] }, 'o');
    expect(s.tags).toEqual([]);
  });

  it('fails on a target that matches nothing, so a stale overlay is noticed', () => {
    expect(() =>
      applyOverlay(spec(), { overlay: '1.0.0', actions: [{ target: `$.paths['/gone'].get`, update: {} }] }, 'fix.yaml'),
    ).toThrow(`Overlay "fix.yaml", action 1: target "$.paths['/gone'].get" matches nothing in the spec.`);
  });

  it('rejects documents that are not overlays and actions without update or remove', () => {
    expect(() => applyOverlay(spec(), { actions: [] }, 'x')).toThrow(/not an Overlay document/);
    expect(() => applyOverlay(spec(), { overlay: '1.0.0', actions: [{ target: '$.paths' }] }, 'x')).toThrow(
      /neither "update" nor "remove: true"/,
    );
  });
});

describe('deriveOperationIds', () => {
  it('derives ids without the prefix and keeps explicit ones', () => {
    const s = spec();
    deriveOperationIds(s, '/api');
    expect(s.paths['/api/pets'].get.operationId).toBe('get_pets');
    expect(s.paths['/api/pets'].post.operationId).toBe('createPet');
    expect(s.paths['/api/pets/{id}'].get.operationId).toBe('get_pets_id');
    // Paths outside the prefix are derived as before.
    expect(s.paths['/sitemap.xml'].get.operationId).toBe('get_sitemap_xml');
  });

  it('accepts the prefix with or without slashes', () => {
    const s = spec();
    deriveOperationIds(s, 'api/');
    expect(s.paths['/api/pets'].get.operationId).toBe('get_pets');
  });

  it('fails when two operations would get the same id', () => {
    const s = { paths: { '/api/pets': { get: {} }, '/pets': { get: {} } } };
    expect(() => deriveOperationIds(s, '/api')).toThrow(/the same operationId "get_pets"/);
  });
});

describe('filterOperations', () => {
  it('excludes by "METHOD /path" and drops path items left empty', () => {
    const s = spec();
    filterOperations(s, [], ['GET /sitemap.xml', 'get /api/pets']);
    expect(s.paths['/sitemap.xml']).toBeUndefined();
    expect(s.paths['/api/pets'].get).toBeUndefined();
    expect(s.paths['/api/pets'].post).toBeDefined();
  });

  it('includes by operationId, including a derived one', () => {
    const s = spec();
    filterOperations(s, ['createPet', 'get_api_pets_id'], []);
    expect(Object.keys(s.paths)).toEqual(['/api/pets', '/api/pets/{id}']);
    expect(s.paths['/api/pets'].get).toBeUndefined();
    // Path-level parameters stay with the path item.
    expect(s.paths['/api/pets/{id}'].parameters).toHaveLength(1);
  });

  it('fails on a selector that matches no operation', () => {
    expect(() => filterOperations(spec(), [], ['DELETE /api/pets', 'nope'])).toThrow(
      'includeOperations/excludeOperations matched no operation: DELETE /api/pets, nope',
    );
  });
});

describe('excludeSecuritySchemes', () => {
  it('removes the scheme from every alternative, and alternatives left empty', () => {
    const s = spec();
    excludeSecuritySchemes(s, ['ApiKey']);
    expect(Object.keys(s.components.securitySchemes)).toEqual(['Bearer', 'Google']);
    expect(s.security).toEqual([{ Bearer: [], Google: ['openid'] }]);
    // An operation that only allowed the dropped scheme now requires none.
    expect(s.paths['/api/pets'].post.security).toEqual([]);
    // An explicit "no security" stays as it was.
    expect(s.paths['/sitemap.xml'].get.security).toEqual([]);
  });

  it('keeps the other schemes of an alternative', () => {
    const s = spec();
    excludeSecuritySchemes(s, ['Google', 'ApiKey']);
    expect(s.security).toEqual([{ Bearer: [] }]);
  });

  it('drops every scheme with *', () => {
    const s = spec();
    excludeSecuritySchemes(s, ['*']);
    expect(s.components.securitySchemes).toBeUndefined();
    expect(s.security).toBeUndefined();
  });

  it('fails on an unknown scheme name', () => {
    expect(() => excludeSecuritySchemes(spec(), ['Cookie'])).toThrow(
      'excludeSecuritySchemes names unknown schemes: Cookie (known: Bearer, Google, ApiKey)',
    );
  });
});

describe('preprocessSpec', () => {
  it('applies overlays before deriving ids, and filters by the derived ids', () => {
    const s = spec();
    preprocessSpec(s, {
      overlays: [
        { source: 'a', document: { overlay: '1.0.0', actions: [{ target: `$.paths['/api/pets'].get`, update: { operationId: 'listPets' } }] } },
      ],
      stripPathPrefix: '/api',
      excludeOperations: ['get_pets_id', 'GET /sitemap.xml'],
      excludeSecuritySchemes: ['*'],
    });
    expect(s.paths['/api/pets'].get.operationId).toBe('listPets');
    expect(Object.keys(s.paths)).toEqual(['/api/pets']);
    expect(s.security).toBeUndefined();
    expect(s.paths['/api/pets'].post.security).toEqual([]);
  });
});
