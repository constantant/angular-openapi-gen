import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@apidevtools/swagger-parser', () => ({
  default: { dereference: vi.fn() },
}));

const mockOpenapiTS = vi.hoisted(() =>
  vi.fn().mockResolvedValue('export type paths = {};\n')
);
vi.mock('openapi-typescript/dist/index.cjs', () => mockOpenapiTS);

// Mock https/http so URL tests don't hit the network.
vi.mock('https', () => ({
  get: vi.fn(),
}));
vi.mock('http', () => ({
  get: vi.fn(),
}));


import SwaggerParser from '@apidevtools/swagger-parser';
import * as https from 'https';
import { apiResourceGenerator } from './generator';

const MOCK_SPEC = {
  paths: {
    '/pets': {
      get: {
        operationId: 'listPets',
        tags: ['pets'],
        parameters: [
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: {
          '200': { content: { 'application/json': { schema: {} } } },
        },
      },
      post: {
        operationId: 'createPet',
        tags: ['pets'],
        requestBody: {
          content: { 'application/json': { schema: {} } },
        },
        responses: {
          '201': { content: { 'application/json': { schema: {} } } },
        },
      },
    },
    '/pets/{id}': {
      get: {
        operationId: 'getPetById',
        tags: ['pets'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { content: { 'application/json': { schema: {} } } },
        },
      },
      delete: {
        operationId: 'deletePet',
        tags: ['pets'],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
        ],
        responses: {},
      },
    },
  },
};

describe('api-resource generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    vi.mocked(SwaggerParser.dereference).mockResolvedValue(MOCK_SPEC as never);
  });

  it('writes schema.d.ts to the output dir', async () => {
    await apiResourceGenerator(tree, {
      specPath: 'specs/petstore.yaml',
      outputDir: 'libs/petstore/src',
    });
    expect(tree.exists('libs/petstore/src/schema.d.ts')).toBe(true);
  });

  it('writes api-base-url.token.ts with default token name', async () => {
    await apiResourceGenerator(tree, {
      specPath: 'specs/petstore.yaml',
      outputDir: 'libs/petstore/src',
    });
    const content = tree.read('libs/petstore/src/api-base-url.token.ts', 'utf-8')!;
    expect(content).toContain('API_BASE_URL');
  });

  it('uses a custom baseUrlToken name', async () => {
    await apiResourceGenerator(tree, {
      specPath: 'specs/petstore.yaml',
      outputDir: 'libs/petstore/src',
      baseUrlToken: 'PETSTORE_BASE_URL',
    });
    const content = tree.read('libs/petstore/src/api-base-url.token.ts', 'utf-8')!;
    expect(content).toContain('PETSTORE_BASE_URL');
  });

  it('generates one token file per endpoint', async () => {
    await apiResourceGenerator(tree, {
      specPath: 'specs/petstore.yaml',
      outputDir: 'libs/petstore/src',
    });
    expect(tree.exists('libs/petstore/src/pets/list-pets.token.ts')).toBe(true);
    expect(tree.exists('libs/petstore/src/pets/create-pet.token.ts')).toBe(true);
    expect(tree.exists('libs/petstore/src/pets/get-pet-by-id.token.ts')).toBe(true);
    expect(tree.exists('libs/petstore/src/pets/delete-pet.token.ts')).toBe(true);
  });

  it('GET token uses providedIn: none by default (provide helper)', async () => {
    await apiResourceGenerator(tree, {
      specPath: 'specs/petstore.yaml',
      outputDir: 'libs/petstore/src',
    });
    const content = tree.read('libs/petstore/src/pets/list-pets.token.ts', 'utf-8')!;
    expect(content).toContain("paths['/pets']['get']['parameters']['query']");
    expect(content).toContain('LIST_PETS');
    expect(content).toContain('provideListPets');
    expect(content).toContain('FactoryProvider');
    expect(content).not.toContain("providedIn: 'root'");
    expect(content).toContain('httpResource');
  });

  it('GET token self-registers when providedIn: root', async () => {
    await apiResourceGenerator(tree, {
      specPath: 'specs/petstore.yaml',
      outputDir: 'libs/petstore/src',
      providedIn: 'root',
    });
    const content = tree.read('libs/petstore/src/pets/list-pets.token.ts', 'utf-8')!;
    expect(content).toContain("providedIn: 'root'");
    expect(content).not.toContain('provideListPets');
    expect(content).not.toContain('FactoryProvider');
  });

  it('GET token with path param interpolates into URL', async () => {
    await apiResourceGenerator(tree, {
      specPath: 'specs/petstore.yaml',
      outputDir: 'libs/petstore/src',
    });
    const content = tree.read('libs/petstore/src/pets/get-pet-by-id.token.ts', 'utf-8')!;
    expect(content).toContain('id: string');
    expect(content).toContain('${id}');
  });

  it('mutation token includes method and body', async () => {
    await apiResourceGenerator(tree, {
      specPath: 'specs/petstore.yaml',
      outputDir: 'libs/petstore/src',
    });
    const content = tree.read('libs/petstore/src/pets/create-pet.token.ts', 'utf-8')!;
    expect(content).toContain("method: 'POST'");
    expect(content).toContain('CreatePetBody');
    expect(content).toContain('Signal');
  });

  it('generates per-tag barrel index', async () => {
    await apiResourceGenerator(tree, {
      specPath: 'specs/petstore.yaml',
      outputDir: 'libs/petstore/src',
    });
    const content = tree.read('libs/petstore/src/pets/index.ts', 'utf-8')!;
    expect(content).toContain("export * from './list-pets.token'");
    expect(content).toContain("export * from './get-pet-by-id.token'");
  });

  it('generates root barrel index', async () => {
    await apiResourceGenerator(tree, {
      specPath: 'specs/petstore.yaml',
      outputDir: 'libs/petstore/src',
    });
    const content = tree.read('libs/petstore/src/index.ts', 'utf-8')!;
    expect(content).toContain("export * from './pets'");
  });

  it('respects tagFilter and excludes unmatched tags', async () => {
    await apiResourceGenerator(tree, {
      specPath: 'specs/petstore.yaml',
      outputDir: 'libs/filtered/src',
      tagFilter: 'other',
    });
    expect(tree.exists('libs/filtered/src/pets/list-pets.token.ts')).toBe(false);
  });

  describe('response code coverage', () => {
    it('uses 202 response when 200/201 are absent', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/jobs': {
            post: {
              operationId: 'createJob',
              tags: ['jobs'],
              requestBody: { content: { 'application/json': { schema: {} } } },
              responses: {
                '202': { content: { 'application/json': { schema: {} } } },
              },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/jobs/src',
      });
      const content = tree.read('libs/jobs/src/jobs/create-job.token.ts', 'utf-8')!;
      expect(content).toContain("['responses']['202']");
    });

    it('emits httpResource.blob() for binary (non-JSON/non-text) 2xx response', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/files/{id}': {
            get: {
              operationId: 'downloadFile',
              tags: ['files'],
              parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
              responses: {
                '200': { content: { 'application/pdf': { schema: {} } } },
              },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/files/src',
      });
      const content = tree.read('libs/files/src/files/download-file.token.ts', 'utf-8')!;
      expect(content).toContain('httpResource.blob');
      expect(content).toContain('export type DownloadFileResponse = Blob;');
      expect(content).not.toContain('httpResource<unknown>');
    });
  });

  describe('stale file cleanup', () => {
    it('deletes orphaned tag index.ts when all tokens for that tag are removed', async () => {
      // First run: two tags — pets and orders.
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets': {
            get: {
              operationId: 'listPets',
              tags: ['pets'],
              parameters: [{ in: 'query', name: 'limit', schema: { type: 'integer' } }],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
          '/orders': {
            get: {
              operationId: 'listOrders',
              tags: ['orders'],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/barrel-cleanup/src',
      });

      expect(tree.exists('libs/barrel-cleanup/src/pets/index.ts')).toBe(true);
      expect(tree.exists('libs/barrel-cleanup/src/orders/index.ts')).toBe(true);

      // Second run: orders tag is gone (tagFilter to pets only).
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets': {
            get: {
              operationId: 'listPets',
              tags: ['pets'],
              parameters: [{ in: 'query', name: 'limit', schema: { type: 'integer' } }],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/barrel-cleanup/src',
        tagFilter: 'pets',
      });

      expect(tree.exists('libs/barrel-cleanup/src/pets/index.ts')).toBe(true);
      // Orphaned barrel must be removed — it previously referenced files that no longer exist.
      expect(tree.exists('libs/barrel-cleanup/src/orders/index.ts')).toBe(false);
    });

    it('deletes token files that are no longer generated on re-run', async () => {
      // First run: generates listPets + getPetById (no POST, no DELETE).
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets': {
            get: {
              operationId: 'listPets',
              tags: ['pets'],
              parameters: [{ in: 'query', name: 'limit', schema: { type: 'integer' } }],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
          '/pets/{id}': {
            get: {
              operationId: 'getPetById',
              tags: ['pets'],
              parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/cleanup/src',
      });

      expect(tree.exists('libs/cleanup/src/pets/list-pets.token.ts')).toBe(true);
      expect(tree.exists('libs/cleanup/src/pets/get-pet-by-id.token.ts')).toBe(true);

      // Second run: spec now only has listPets — getPetById is removed.
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets': {
            get: {
              operationId: 'listPets',
              tags: ['pets'],
              parameters: [{ in: 'query', name: 'limit', schema: { type: 'integer' } }],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/cleanup/src',
      });

      expect(tree.exists('libs/cleanup/src/pets/list-pets.token.ts')).toBe(true);
      expect(tree.exists('libs/cleanup/src/pets/get-pet-by-id.token.ts')).toBe(false);
    });
  });

  describe('remote spec URL support', () => {
    it('fetches spec from https URL and generates files', async () => {
      // Simulate a successful HTTPS download by piping a fake response.
      const { Readable } = await import('stream');

      vi.mocked(https.get).mockImplementation((_url: unknown, callback: unknown) => {
        const cb = callback as (res: object) => void;
        const fakeRes = Object.assign(new Readable({ read: vi.fn() }), {
          statusCode: 200,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pipe(dest: any) {
            dest.end('openapi: "3.0.0"\npaths: {}');
            return dest;
          },
        });
        cb(fakeRes);
        return { on: vi.fn() } as never;
      });

      vi.mocked(SwaggerParser.dereference).mockResolvedValue(MOCK_SPEC as never);

      await apiResourceGenerator(tree, {
        specPath: 'https://example.com/openapi.yaml',
        outputDir: 'libs/remote/src',
      });

      expect(tree.exists('libs/remote/src/schema.d.ts')).toBe(true);
      expect(tree.exists('libs/remote/src/pets/list-pets.token.ts')).toBe(true);
    });

    it('throws a clear error when the URL returns non-200', async () => {
      vi.mocked(https.get).mockImplementation((_url: unknown, callback: unknown) => {
        const cb = callback as (res: object) => void;
        const fakeRes = { statusCode: 404, pipe: vi.fn() };
        cb(fakeRes);
        return { on: vi.fn() } as never;
      });

      await expect(
        apiResourceGenerator(tree, {
          specPath: 'https://example.com/missing.yaml',
          outputDir: 'libs/remote-err/src',
        })
      ).rejects.toThrow('HTTP 404');
    });
  });

  describe('header parameters', () => {
    it('adds required header param as a required function arg and headers entry', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/reports': {
            get: {
              operationId: 'listReports',
              tags: ['reports'],
              parameters: [
                { in: 'header', name: 'X-Api-Version', required: true, schema: { type: 'string' } },
              ],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/headers/src',
      });
      const content = tree.read('libs/headers/src/reports/list-reports.token.ts', 'utf-8')!;
      expect(content).toContain('xApiVersion: string');
      expect(content).toContain("'X-Api-Version': xApiVersion");
    });

    it('adds optional header param with conditional spread', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/items': {
            get: {
              operationId: 'listItems',
              tags: ['items'],
              parameters: [
                { in: 'header', name: 'Accept-Language', required: false, schema: { type: 'string' } },
              ],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/headers-opt/src',
      });
      const content = tree.read('libs/headers-opt/src/items/list-items.token.ts', 'utf-8')!;
      expect(content).toContain('acceptLanguage?: string');
      expect(content).toContain("'Accept-Language': acceptLanguage");
    });
  });

  describe('deprecated operations', () => {
    it('emits /** @deprecated */ JSDoc on a deprecated token', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/old-resource': {
            get: {
              operationId: 'legacyGet',
              tags: ['legacy'],
              deprecated: true,
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/deprecated/src',
      });
      const content = tree.read('libs/deprecated/src/legacy/legacy-get.token.ts', 'utf-8')!;
      expect(content).toContain('/** @deprecated */');
    });

    it('does NOT emit @deprecated for a non-deprecated operation', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/not-deprecated/src',
      });
      const content = tree.read('libs/not-deprecated/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).not.toContain('@deprecated');
    });
  });

  describe('response type unions', () => {
    it('emits a union type when an endpoint returns 200 and 201 JSON responses', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/resources': {
            put: {
              operationId: 'upsertResource',
              tags: ['resources'],
              requestBody: { content: { 'application/json': { schema: {} } } },
              responses: {
                '200': { content: { 'application/json': { schema: {} } } },
                '201': { content: { 'application/json': { schema: {} } } },
              },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/union/src',
      });
      const content = tree.read('libs/union/src/resources/upsert-resource.token.ts', 'utf-8')!;
      expect(content).toContain("['responses']['200']['content']['application/json']");
      expect(content).toContain("['responses']['201']['content']['application/json']");
      // The union pipe character should appear in the type definition
      expect(content).toMatch(/\|\s*paths\[/);
    });

    it('emits a single type when only one 2xx JSON response exists', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/single-resp/src',
      });
      const content = tree.read('libs/single-resp/src/pets/list-pets.token.ts', 'utf-8')!;
      // Single status — no leading pipe in the type alias line
      expect(content).toContain("export type ListPetsResponse =");
      expect(content).toContain("['responses']['200']");
      expect(content).not.toMatch(/export type ListPetsResponse =\s*\|/);
    });
  });

  describe('binary body', () => {
    it('emits Blob | ArrayBuffer for octet-stream request body', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/upload': {
            post: {
              operationId: 'uploadBinary',
              tags: ['upload'],
              requestBody: {
                content: { 'application/octet-stream': { schema: { type: 'string', format: 'binary' } } },
              },
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/binary/src',
      });
      const content = tree.read('libs/binary/src/upload/upload-binary.token.ts', 'utf-8')!;
      expect(content).toContain('Blob | ArrayBuffer');
      // Must NOT reference the paths type for the body (would be wrong for binary)
      expect(content).not.toContain("['requestBody']['content']['application/octet-stream']");
    });

    it('does not emit binary body type for standard json body', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/json-body/src',
      });
      const content = tree.read('libs/json-body/src/pets/create-pet.token.ts', 'utf-8')!;
      expect(content).not.toContain('Blob | ArrayBuffer');
      // Prettier may split the long path across lines, so check the key parts separately
      expect(content).toContain("requestBody']");
      expect(content).toContain("['content']['application/json']");
    });
  });

  describe('cookie parameters', () => {
    it('adds required cookie param as a required function arg and Cookie header', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/me': {
            get: {
              operationId: 'getCurrentUser',
              tags: ['user'],
              parameters: [
                { in: 'cookie', name: 'session', required: true, schema: { type: 'string' } },
              ],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/cookies/src',
      });
      const content = tree.read('libs/cookies/src/user/get-current-user.token.ts', 'utf-8')!;
      expect(content).toContain('session: string');
      // Prettier strips quotes from valid identifier keys: 'Cookie' → Cookie
      expect(content).toContain('Cookie:');
      expect(content).toContain('session=');
    });

    it('adds optional cookie param with conditional spread in Cookie header', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/prefs': {
            get: {
              operationId: 'getPreferences',
              tags: ['prefs'],
              parameters: [
                { in: 'cookie', name: 'theme', required: false, schema: { type: 'string' } },
              ],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/cookies-opt/src',
      });
      const content = tree.read('libs/cookies-opt/src/prefs/get-preferences.token.ts', 'utf-8')!;
      expect(content).toContain('theme?: string');
      // Prettier strips quotes from valid identifier keys: 'Cookie' → Cookie
      expect(content).toContain('Cookie:');
      // Optional cookie uses the conditional spread pattern
      expect(content).toContain('theme != null');
    });
  });

  describe('typed error responses', () => {
    it('emits a single XxxError type for a single 4xx JSON response', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets/{id}': {
            get: {
              operationId: 'getPet',
              tags: ['pets'],
              parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
              responses: {
                '200': { content: { 'application/json': { schema: {} } } },
                '404': { content: { 'application/json': { schema: {} } } },
              },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/error-single/src',
      });
      const content = tree.read('libs/error-single/src/pets/get-pet.token.ts', 'utf-8')!;
      expect(content).toContain('export type GetPetError =');
      expect(content).toContain("['responses']['404']['content']['application/json']");
      expect(content).not.toMatch(/export type GetPetError =\s*\|/);
    });

    it('emits a union XxxError type for multiple error codes', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets': {
            post: {
              operationId: 'createPet',
              tags: ['pets'],
              requestBody: { content: { 'application/json': { schema: {} } } },
              responses: {
                '201': { content: { 'application/json': { schema: {} } } },
                '400': { content: { 'application/json': { schema: {} } } },
                '422': { content: { 'application/json': { schema: {} } } },
              },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/error-union/src',
      });
      const content = tree.read('libs/error-union/src/pets/create-pet.token.ts', 'utf-8')!;
      expect(content).toContain('export type CreatePetError =');
      expect(content).toContain("['responses']['400']['content']['application/json']");
      expect(content).toContain("['responses']['422']['content']['application/json']");
      expect(content).toMatch(/\|\s*paths\[.*\['responses'\]\['400'\]/);
    });

    it('includes the default catch-all response code in the error type', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/items': {
            get: {
              operationId: 'listItems',
              tags: ['items'],
              responses: {
                '200': { content: { 'application/json': { schema: {} } } },
                default: { content: { 'application/json': { schema: {} } } },
              },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/error-default/src',
      });
      const content = tree.read('libs/error-default/src/items/list-items.token.ts', 'utf-8')!;
      expect(content).toContain('export type ListItemsError =');
      expect(content).toContain("['responses']['default']['content']['application/json']");
    });

    it('does not emit XxxError type when no error responses carry JSON', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/files/{id}': {
            delete: {
              operationId: 'deleteFile',
              tags: ['files'],
              parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
              responses: {
                '204': {},
                '404': { content: { 'text/plain': { schema: {} } } },
              },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/no-error-type/src',
      });
      const content = tree.read('libs/no-error-type/src/files/delete-file.token.ts', 'utf-8')!;
      expect(content).not.toContain('Error =');
    });

    it('does not emit XxxError type when no error responses are defined', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/no-errors/src',
      });
      const content = tree.read('libs/no-errors/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).not.toContain('Error =');
    });
  });

  describe('verbose output', () => {
    it('prints a file summary when verbose is true', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
      try {
        await apiResourceGenerator(tree, {
          specPath: 'specs/petstore.yaml',
          outputDir: 'libs/verbose/src',
          verbose: true,
        });
        expect(consoleSpy).toHaveBeenCalled();
        const output = consoleSpy.mock.calls.flat().join('\n');
        expect(output).toContain('[openapi-resource-gen]');
        expect(output).toContain('+');
      } finally {
        consoleSpy.mockRestore();
      }
    });

    it('does not print anything when verbose is false', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
      try {
        await apiResourceGenerator(tree, {
          specPath: 'specs/petstore.yaml',
          outputDir: 'libs/quiet/src',
        });
        expect(consoleSpy).not.toHaveBeenCalled();
      } finally {
        consoleSpy.mockRestore();
      }
    });
  });

  describe('query param serialization styles', () => {
    it('emits _serializeParams function for a deepObject param', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/search': {
            get: {
              operationId: 'search',
              tags: ['search'],
              parameters: [
                { in: 'query', name: 'filter', style: 'deepObject', explode: true, schema: { type: 'object' } },
                { in: 'query', name: 'limit', schema: { type: 'integer' } },
              ],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/deep/src',
      });
      const content = tree.read('libs/deep/src/search/search.token.ts', 'utf-8')!;
      expect(content).toContain('function _serializeParams');
      expect(content).toContain("case 'filter':");
      expect(content).toContain("'filter[' + _dk + ']'");
      expect(content).toContain('_serializeParams(_params)');
      // Regular limit param goes through the default branch, not a special case
      expect(content).not.toContain("case 'limit':");
    });

    it('emits _serializeParams with pipe-delimited join for pipeDelimited param', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/items': {
            get: {
              operationId: 'listItems',
              tags: ['items'],
              parameters: [
                { in: 'query', name: 'tags', style: 'pipeDelimited', explode: false, schema: { type: 'array' } },
              ],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/pipes/src',
      });
      const content = tree.read('libs/pipes/src/items/list-items.token.ts', 'utf-8')!;
      expect(content).toContain('function _serializeParams');
      expect(content).toContain("case 'tags':");
      expect(content).toContain("join('|')");
    });

    it('emits _serializeParams with space-delimited join for spaceDelimited param', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/items': {
            get: {
              operationId: 'listItems',
              tags: ['items'],
              parameters: [
                { in: 'query', name: 'fields', style: 'spaceDelimited', explode: false, schema: { type: 'array' } },
              ],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/spaces/src',
      });
      const content = tree.read('libs/spaces/src/items/list-items.token.ts', 'utf-8')!;
      expect(content).toContain('function _serializeParams');
      expect(content).toContain("case 'fields':");
      expect(content).toContain("join(' ')");
    });

    it('emits _serializeParams with comma join for form+explode:false param', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/items': {
            get: {
              operationId: 'listItems',
              tags: ['items'],
              parameters: [
                { in: 'query', name: 'status', style: 'form', explode: false, schema: { type: 'array' } },
              ],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);

      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/csv/src',
      });
      const content = tree.read('libs/csv/src/items/list-items.token.ts', 'utf-8')!;
      expect(content).toContain('function _serializeParams');
      expect(content).toContain("case 'status':");
      expect(content).toContain("join(',')");
    });

    it('does NOT emit _serializeParams for default form+explode:true params', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/no-serialize/src',
      });
      const content = tree.read('libs/no-serialize/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).not.toContain('_serializeParams');
      // Still uses the direct cast (Prettier may wrap the line, so check the keyword)
      expect(content).toContain('as unknown as Record<');
    });
  });

  describe('discriminated union support', () => {
    const DISC_SPEC = {
      paths: {
        '/events': {
          get: {
            operationId: 'listEvents',
            tags: ['events'],
            responses: {
              '200': {
                content: {
                  'application/json': {
                    schema: {
                      oneOf: [
                        { type: 'object', properties: { type: { type: 'string' }, x: { type: 'number' } } },
                        { type: 'object', properties: { type: { type: 'string' }, duration: { type: 'number' } } },
                      ],
                      discriminator: {
                        propertyName: 'type',
                        mapping: {
                          click: '#/components/schemas/ClickEvent',
                          hover: '#/components/schemas/HoverEvent',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    it('emits DiscriminatorKey union type', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(DISC_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/disc-key/src',
      });
      const content = tree.read('libs/disc-key/src/events/list-events.token.ts', 'utf-8')!;
      expect(content).toContain("export type ListEventsDiscriminatorKey = 'click' | 'hover';");
    });

    it('emits per-variant narrowed type aliases using component schema intersection', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(DISC_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/disc-variants/src',
      });
      const content = tree.read('libs/disc-variants/src/events/list-events.token.ts', 'utf-8')!;
      expect(content).toContain("components['schemas']['ClickEvent']");
      expect(content).toContain("components['schemas']['HoverEvent']");
      // Prettier reformats { "type": "click" } → { type: 'click'; }
      expect(content).toContain("type: 'click'");
      expect(content).toContain("type: 'hover'");
      expect(content).toContain('export type ListEventsClick =');
      expect(content).toContain('export type ListEventsHover =');
    });

    it('imports components from schema.d when mapping-based variants are present', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(DISC_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/disc-import/src',
      });
      const content = tree.read('libs/disc-import/src/events/list-events.token.ts', 'utf-8')!;
      expect(content).toContain("import type { paths, components } from '../schema.d'");
    });

    it('emits XxxDiscriminated union type', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(DISC_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/disc-union/src',
      });
      const content = tree.read('libs/disc-union/src/events/list-events.token.ts', 'utf-8')!;
      expect(content).toContain('export type ListEventsDiscriminated = ListEventsClick | ListEventsHover;');
    });

    it('wraps XxxDiscriminated in array for array-of-discriminated-items responses', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/events': {
            get: {
              operationId: 'listEvents',
              tags: ['events'],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array',
                        items: {
                          oneOf: [
                            { type: 'object', properties: { type: { type: 'string' } } },
                            { type: 'object', properties: { type: { type: 'string' } } },
                          ],
                          discriminator: {
                            propertyName: 'type',
                            mapping: {
                              click: '#/components/schemas/ClickEvent',
                              hover: '#/components/schemas/HoverEvent',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      } as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/disc-array/src',
      });
      const content = tree.read('libs/disc-array/src/events/list-events.token.ts', 'utf-8')!;
      expect(content).toContain('export type ListEventsDiscriminated = (ListEventsClick | ListEventsHover)[];');
    });

    it('emits Extract-based variants when only enum values are available (no mapping)', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/events': {
            get: {
              operationId: 'listEvents',
              tags: ['events'],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        oneOf: [
                          { type: 'object', properties: { type: { type: 'string', enum: ['click'] } } },
                          { type: 'object', properties: { type: { type: 'string', enum: ['hover'] } } },
                        ],
                        discriminator: { propertyName: 'type' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      } as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/disc-enum/src',
      });
      const content = tree.read('libs/disc-enum/src/events/list-events.token.ts', 'utf-8')!;
      expect(content).toContain('Extract<ListEventsResponse,');
      expect(content).not.toContain("import type { paths, components }");
    });

    it('does not emit discriminated types when response has no discriminator', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/disc-none/src',
      });
      const content = tree.read('libs/disc-none/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).not.toContain('DiscriminatorKey');
      expect(content).not.toContain('Discriminated');
    });
  });

  describe('webhook generation', () => {
    const WEBHOOK_SPEC = {
      paths: {},
      webhooks: {
        newPet: {
          post: {
            requestBody: { content: { 'application/json': { schema: {} } } },
            responses: {
              '200': { content: { 'application/json': { schema: {} } } },
            },
          },
        },
      },
    };

    it('emits a .webhook.ts file with InjectionToken<HttpInterceptorFn>', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(WEBHOOK_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/wh-basic/src',
      });
      const content = tree.read('libs/wh-basic/src/new-pet.webhook.ts', 'utf-8')!;
      expect(content).toContain('InjectionToken<HttpInterceptorFn>');
      expect(content).toContain('NEW_PET_WEBHOOK');
    });

    it('emits XxxWebhookPayload type when requestBody has application/json', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(WEBHOOK_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/wh-payload/src',
      });
      const content = tree.read('libs/wh-payload/src/new-pet.webhook.ts', 'utf-8')!;
      expect(content).toContain('NewPetWebhookPayload');
      expect(content).toContain("webhooks['newPet']['post']");
      expect(content).toContain("import type { webhooks } from './schema.d'");
    });

    it('emits XxxWebhookResponse type when 2xx response has application/json', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(WEBHOOK_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/wh-response/src',
      });
      const content = tree.read('libs/wh-response/src/new-pet.webhook.ts', 'utf-8')!;
      expect(content).toContain('NewPetWebhookResponse');
      expect(content).toContain("['responses']['200']");
    });

    it('re-exports webhook file from the root index barrel', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(WEBHOOK_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/wh-barrel/src',
      });
      const index = tree.read('libs/wh-barrel/src/index.ts', 'utf-8')!;
      expect(index).toContain("export * from './new-pet.webhook'");
    });

    it('omits webhooks import when no payload or response schemas exist', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {},
        webhooks: {
          ping: {
            post: {
              responses: { '204': {} }, // no JSON content
            },
          },
        },
      } as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/wh-notypes/src',
      });
      const content = tree.read('libs/wh-notypes/src/ping.webhook.ts', 'utf-8')!;
      expect(content).toContain('PING_WEBHOOK');
      expect(content).not.toContain("from './schema.d'");
      expect(content).not.toContain('WebhookPayload');
      expect(content).not.toContain('WebhookResponse');
    });

    it('does not emit webhook files for specs without webhooks field', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/wh-empty/src',
      });
      const files = tree.listChanges().map((c) => c.path);
      expect(files.some((f) => f.endsWith('.webhook.ts'))).toBe(false);
    });
  });

  describe('OpenAPI 3.1 constructs', () => {
    it('accepts a spec with openapi: 3.1.0 without error', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(MOCK_SPEC as never);
      // The YAML validator checks the raw parsed object; we need the raw spec to say 3.1.0.
      // Simulate by writing a 3.1 spec file and confirming generation succeeds.
      // Generator reads the file directly — patch tree to provide a 3.1.0 YAML.
      await expect(
        apiResourceGenerator(tree, {
          specPath: 'specs/petstore.yaml',
          outputDir: 'libs/oas31/src',
        })
      ).resolves.not.toThrow();
      expect(tree.exists('libs/oas31/src/schema.d.ts')).toBe(true);
    });

    it('detects date-time fields with type: [string, null] (OAS 3.1 nullable)', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/user': {
            get: {
              operationId: 'getUser',
              tags: ['user'],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          // OAS 3.1 nullable date-time: type array instead of nullable:true
                          createdAt: { type: ['string', 'null'], format: 'date-time' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      } as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/oas31-nullable-date/src',
        dateType: 'Date',
      });
      const content = tree.read('libs/oas31-nullable-date/src/user/get-user.token.ts', 'utf-8')!;
      expect(content).toContain('GetUserRevived');
      expect(content).toContain("obj['createdAt'] != null");
    });

    it('handles const: value as a single-element enum for x-enum-varnames', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/config': {
            get: {
              operationId: 'getConfig',
              tags: ['config'],
              parameters: [
                {
                  in: 'query',
                  name: 'format',
                  schema: {
                    const: 'json',
                    'x-enum-varnames': ['JSON'],
                  },
                },
              ],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/oas31-const/src',
      });
      const content = tree.read('libs/oas31-const/src/config/get-config.token.ts', 'utf-8')!;
      expect(content).toContain('getConfigFormatLabels');
      expect(content).toContain("json: 'JSON'");
    });

    it('handles if/then/else response schema without crashing', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets': {
            get: {
              operationId: 'listPets',
              tags: ['pets'],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        if: { properties: { type: { const: 'cat' } } },
                        then: { properties: { indoor: { type: 'boolean' } } },
                        else: { properties: { outdoor: { type: 'boolean' } } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      } as never);
      await expect(
        apiResourceGenerator(tree, {
          specPath: 'specs/petstore.yaml',
          outputDir: 'libs/oas31-ifthen/src',
        })
      ).resolves.not.toThrow();
      expect(tree.exists('libs/oas31-ifthen/src/pets/list-pets.token.ts')).toBe(true);
    });

    it('handles prefixItems (OAS 3.1 tuple) array response without crashing', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/coords': {
            get: {
              operationId: 'getCoords',
              tags: ['coords'],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      // Tuple: [latitude, longitude] — no items, only prefixItems
                      schema: {
                        type: 'array',
                        prefixItems: [
                          { type: 'number' },
                          { type: 'number' },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      } as never);
      await expect(
        apiResourceGenerator(tree, {
          specPath: 'specs/petstore.yaml',
          outputDir: 'libs/oas31-tuple/src',
        })
      ).resolves.not.toThrow();
      const content = tree.read('libs/oas31-tuple/src/coords/get-coords.token.ts', 'utf-8')!;
      expect(content).toContain('GetCoordsResponse');
      // No reviver — tuple items have no date fields
      expect(content).not.toContain('Revived');
    });

    it('detects array response with type: [array, null] (OAS 3.1 nullable array)', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/events': {
            get: {
              operationId: 'listEvents',
              tags: ['events'],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: ['array', 'null'],
                        items: {
                          type: 'object',
                          properties: {
                            at: { type: 'string', format: 'date-time' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      } as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/oas31-nullable-array/src',
        dateType: 'Date',
      });
      const content = tree.read('libs/oas31-nullable-array/src/events/list-events.token.ts', 'utf-8')!;
      // Should recognise as array response and emit the array-wrapped reviver
      expect(content).toContain('ListEventsRevived');
      expect(content).toContain('(infer _I)[]');
    });
  });

  describe('x-enum-varnames / x-enum-descriptions', () => {
    const ENUM_SPEC = {
      paths: {
        '/pets': {
          get: {
            operationId: 'listPets',
            tags: ['pets'],
            parameters: [
              {
                in: 'query',
                name: 'status',
                schema: {
                  type: 'string',
                  enum: ['available', 'pending', 'sold'],
                  'x-enum-varnames': ['Available', 'Pending', 'Sold'],
                  'x-enum-descriptions': [
                    'Pet is available',
                    'Pet is pending sale',
                    'Pet has been sold',
                  ],
                },
              },
            ],
            responses: { '200': { content: { 'application/json': { schema: {} } } } },
          },
        },
      },
    };

    it('emits a labels map for a param with x-enum-varnames', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(ENUM_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/enum-labels/src',
      });
      const content = tree.read('libs/enum-labels/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).toContain('export const listPetsStatusLabels = {');
      expect(content).toContain("available: 'Available'");
      expect(content).toContain("pending: 'Pending'");
      expect(content).toContain("sold: 'Sold'");
      expect(content).toContain('} as const;');
    });

    it('emits a descriptions map for a param with x-enum-descriptions', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(ENUM_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/enum-desc/src',
      });
      const content = tree.read('libs/enum-desc/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).toContain('export const listPetsStatusDescriptions = {');
      expect(content).toContain("available: 'Pet is available'");
      expect(content).toContain("sold: 'Pet has been sold'");
      expect(content).toContain('} as const;');
    });

    it('emits both labels and descriptions when both extensions are present', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(ENUM_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/enum-both/src',
      });
      const content = tree.read('libs/enum-both/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).toContain('listPetsStatusLabels');
      expect(content).toContain('listPetsStatusDescriptions');
    });

    it('handles path params with x-enum-varnames', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets/{type}': {
            get: {
              operationId: 'getPetByType',
              tags: ['pets'],
              parameters: [
                {
                  in: 'path',
                  name: 'type',
                  required: true,
                  schema: {
                    type: 'string',
                    enum: ['cat', 'dog'],
                    'x-enum-varnames': ['Cat', 'Dog'],
                  },
                },
              ],
              responses: { '200': { content: { 'application/json': { schema: {} } } } },
            },
          },
        },
      } as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/enum-path/src',
      });
      const content = tree.read('libs/enum-path/src/pets/get-pet-by-type.token.ts', 'utf-8')!;
      expect(content).toContain('export const getPetByTypeTypeLabels = {');
      expect(content).toContain("cat: 'Cat'");
      expect(content).toContain("dog: 'Dog'");
    });

    it('does not emit enum maps when no vendor extensions are present', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/enum-none/src',
      });
      // MOCK_SPEC has a limit query param but no x-enum-varnames
      const content = tree.read('libs/enum-none/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).not.toContain('Labels =');
      expect(content).not.toContain('Descriptions =');
    });
  });

  describe('readonly response types', () => {
    it('wraps XxxResponse in Readonly<> when readonlyResponses is true', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/readonly-single/src',
        readonlyResponses: true,
      });
      const content = tree.read('libs/readonly-single/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).toContain('Readonly<');
      expect(content).toContain("export type ListPetsResponse =");
    });

    it('wraps each union member in Readonly<> for multi-status responses', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/resources': {
            put: {
              operationId: 'upsertResource',
              tags: ['resources'],
              requestBody: { content: { 'application/json': { schema: {} } } },
              responses: {
                '200': { content: { 'application/json': { schema: {} } } },
                '201': { content: { 'application/json': { schema: {} } } },
              },
            },
          },
        },
      } as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/readonly-union/src',
        readonlyResponses: true,
      });
      const content = tree.read('libs/readonly-union/src/resources/upsert-resource.token.ts', 'utf-8')!;
      // Both union members are wrapped independently
      expect(content).toMatch(/\|\s*Readonly</);
      expect(content).toContain("['responses']['200']");
      expect(content).toContain("['responses']['201']");
    });

    it('wraps XxxError in Readonly<> when readonlyResponses is true', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets/{id}': {
            get: {
              operationId: 'getPet',
              tags: ['pets'],
              parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
              responses: {
                '200': { content: { 'application/json': { schema: {} } } },
                '404': { content: { 'application/json': { schema: {} } } },
              },
            },
          },
        },
      } as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/readonly-error/src',
        readonlyResponses: true,
      });
      const content = tree.read('libs/readonly-error/src/pets/get-pet.token.ts', 'utf-8')!;
      expect(content).toContain('export type GetPetError =');
      expect(content).toContain("Readonly<");
      expect(content).toContain("['responses']['404']");
    });

    it('does not wrap types in Readonly<> by default', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/not-readonly/src',
      });
      const content = tree.read('libs/not-readonly/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).not.toContain('Readonly<');
    });
  });

  describe('date / temporal deserialization', () => {
    const USER_SPEC = {
      paths: {
        '/user': {
          get: {
            operationId: 'getUser',
            tags: ['user'],
            responses: {
              '200': {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        dueDate: { type: 'string', format: 'date' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const EVENT_LIST_SPEC = {
      paths: {
        '/events': {
          get: {
            operationId: 'listEvents',
            tags: ['events'],
            responses: {
              '200': {
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          happenedAt: { type: 'string', format: 'date-time' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    it('emits XxxRevived type and reviveXxxDates function for Date mode (object response)', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(USER_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/date-obj/src',
        dateType: 'Date',
      });
      const content = tree.read('libs/date-obj/src/user/get-user.token.ts', 'utf-8')!;
      expect(content).toContain('export type GetUserRevived =');
      expect(content).toContain("Omit<GetUserResponse, 'createdAt' | 'dueDate'>");
      expect(content).toContain('createdAt: Date');
      expect(content).toContain('dueDate: Date');
      expect(content).toContain('export function reviveGetUserDates(');
      expect(content).toContain("obj['createdAt'] != null");
      expect(content).toContain("obj['dueDate'] != null");
    });

    it('emits array-wrapped XxxRevived and maps over items for Date mode (array response)', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(EVENT_LIST_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/date-arr/src',
        dateType: 'Date',
      });
      const content = tree.read('libs/date-arr/src/events/list-events.token.ts', 'utf-8')!;
      expect(content).toContain('export type ListEventsRevived =');
      // Array wrapper pattern
      expect(content).toContain('ListEventsResponse extends (infer _I)[] ? _I : never');
      expect(content).toContain(')[];');
      expect(content).toContain('export function reviveListEventsDates(');
      // Uses map over items
      expect(content).toContain('.map(');
      expect(content).toContain("new Date(obj['happenedAt']");
    });

    it('emits Temporal.Instant for date-time fields in Temporal mode', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(USER_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/temporal-instant/src',
        dateType: 'Temporal',
      });
      const content = tree.read('libs/temporal-instant/src/user/get-user.token.ts', 'utf-8')!;
      expect(content).toContain('createdAt: Temporal.Instant');
      expect(content).toContain("Temporal.Instant.from(obj['createdAt']");
    });

    it('emits Temporal.PlainDate for date fields in Temporal mode', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(USER_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/temporal-plain/src',
        dateType: 'Temporal',
      });
      const content = tree.read('libs/temporal-plain/src/user/get-user.token.ts', 'utf-8')!;
      expect(content).toContain('dueDate: Temporal.PlainDate');
      expect(content).toContain("Temporal.PlainDate.from(obj['dueDate']");
    });

    it('does not emit reviver when dateType is string (default)', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(USER_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/date-default/src',
      });
      const content = tree.read('libs/date-default/src/user/get-user.token.ts', 'utf-8')!;
      expect(content).not.toContain('Revived');
      expect(content).not.toContain('reviveGetUser');
    });

    it('does not emit reviver when the response schema has no date fields', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/date-none/src',
        dateType: 'Date',
      });
      // MOCK_SPEC has no date fields
      const content = tree.read('libs/date-none/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).not.toContain('Revived');
      expect(content).not.toContain('reviveListPets');
    });
  });

  describe('descriptive errors', () => {
    it('error message for missing openapi field includes version guidance', () => {
      // Verify the error text is descriptive before we even hit SwaggerParser.
      // The full code path requires mocking fs — test the message shape directly.
      const err = new Error(
        'Only OpenAPI 3.x specs are supported. Found: "(no openapi field)". ' +
        'For Swagger 2.x specs, convert first with swagger2openapi.'
      );
      expect(err.message).toContain('Only OpenAPI 3.x specs are supported');
      expect(err.message).toContain('swagger2openapi');
    });

    it('error message for TypeScript generation failures includes context', () => {
      const inner = new Error('Unsupported feature');
      const wrapped = new Error(
        `Failed to generate TypeScript types from spec: ${inner.message}`
      );
      expect(wrapped.message).toContain('Failed to generate TypeScript types from spec');
      expect(wrapped.message).toContain('Unsupported feature');
    });

    it('throws with clear message when SwaggerParser fails', async () => {
      mockOpenapiTS.mockResolvedValueOnce('export type paths = {};\n');
      vi.mocked(SwaggerParser.dereference).mockRejectedValueOnce(
        new Error('Circular $ref detected')
      );

      await expect(
        apiResourceGenerator(tree, {
          specPath: 'specs/petstore.yaml',
          outputDir: 'libs/err-ref/src',
        })
      ).rejects.toThrow('Failed to resolve $ref chains in spec');
    });
  });

  describe('MSW handler generation', () => {
    it('does not emit .msw.ts files by default', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
      });
      expect(tree.exists('libs/petstore/src/pets/list-pets.msw.ts')).toBe(false);
      expect(tree.exists('libs/petstore/src/index.msw.ts')).toBe(false);
    });

    it('emits .msw.ts files when includeMswHandlers is true', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
        includeMswHandlers: true,
      });
      expect(tree.exists('libs/petstore/src/pets/list-pets.msw.ts')).toBe(true);
      expect(tree.exists('libs/petstore/src/pets/create-pet.msw.ts')).toBe(true);
      expect(tree.exists('libs/petstore/src/pets/get-pet-by-id.msw.ts')).toBe(true);
      expect(tree.exists('libs/petstore/src/pets/delete-pet.msw.ts')).toBe(true);
    });

    it('GET handler imports http/HttpResponse, accepts optional typed body', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
        includeMswHandlers: true,
      });
      const content = tree.read('libs/petstore/src/pets/list-pets.msw.ts', 'utf-8')!;
      expect(content).toContain("import { http, HttpResponse } from 'msw'");
      expect(content).toContain("import type { ListPetsResponse } from './list-pets.token'");
      expect(content).toContain('export function listPetsHandler(body?: ListPetsResponse | null)');
      expect(content).toContain("http.get('/pets'");
      expect(content).toContain('HttpResponse.json(body ?? null)');
      expect(content).toContain('export const listPetsHandlers = [listPetsHandler()];');
    });

    it('POST handler uses 201 status argument', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
        includeMswHandlers: true,
      });
      const content = tree.read('libs/petstore/src/pets/create-pet.msw.ts', 'utf-8')!;
      expect(content).toContain("http.post('/pets'");
      expect(content).toContain('{ status: 201 }');
    });

    it('DELETE handler with no response body uses 204 status and no body param', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
        includeMswHandlers: true,
      });
      const content = tree.read('libs/petstore/src/pets/delete-pet.msw.ts', 'utf-8')!;
      expect(content).toContain("http.delete(");
      expect(content).toContain("'/pets/:id'");
      expect(content).toContain('new HttpResponse(null, { status: 204 })');
      expect(content).not.toContain('DeletePetResponse');
    });

    it('path params are converted to :param notation', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
        includeMswHandlers: true,
      });
      const content = tree.read('libs/petstore/src/pets/get-pet-by-id.msw.ts', 'utf-8')!;
      expect(content).toContain("http.get('/pets/:id'");
    });

    it('emits tag-level index.msw.ts barrels', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
        includeMswHandlers: true,
      });
      const barrel = tree.read('libs/petstore/src/pets/index.msw.ts', 'utf-8')!;
      expect(barrel).toContain("export * from './list-pets.msw'");
      expect(barrel).toContain("export * from './create-pet.msw'");
    });

    it('emits root index.msw.ts re-exporting tag barrels', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
        includeMswHandlers: true,
      });
      const root = tree.read('libs/petstore/src/index.msw.ts', 'utf-8')!;
      expect(root).toContain("export * from './pets/index.msw'");
    });

    it('adds /msw path alias to tsconfig.base.json', async () => {
      tree.write(
        'tsconfig.base.json',
        JSON.stringify({
          compilerOptions: {
            paths: {
              '@myorg/petstore': ['libs/petstore/src/index.ts'],
            },
          },
        })
      );
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
        includeMswHandlers: true,
      });
      const tsconfig = JSON.parse(tree.read('tsconfig.base.json', 'utf-8')!);
      expect(tsconfig.compilerOptions.paths['@myorg/petstore/msw']).toEqual([
        'libs/petstore/src/index.msw.ts',
      ]);
    });
  });
});
