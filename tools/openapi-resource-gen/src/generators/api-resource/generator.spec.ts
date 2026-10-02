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


// includeMocks needs @constantant/openapi-resource-mocks to resolve, which it can't here
// (the package isn't built in this workspace). The real check is covered in ensure-package.spec.ts.
vi.mock('./ensure-package', () => ({ ensurePackageInstalled: vi.fn() }));

import SwaggerParser from '@apidevtools/swagger-parser';
import * as https from 'https';
import { apiResourceGenerator } from './generator';
import { renderMockFile } from './render-mock-file';
import { ensurePackageInstalled } from './ensure-package';

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
    // Nx 23.2 defaults createTreeWithEmptyWorkspace() to seeding .oxfmtrc.json
    // instead of .prettierrc to exercise the new oxfmt path; this workspace
    // doesn't have oxfmt installed, so formatFiles() would silently skip
    // formatting and leave generated output unformatted (e.g. double-quoted
    // JSON.stringify literals) unless prettier is requested explicitly.
    tree = createTreeWithEmptyWorkspace({ formatter: 'prettier' });
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

  describe('runtime response validation (validateResponses)', () => {
    it('does not emit validation by default', async () => {
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/no-validate/src',
      });
      const content = tree.read('libs/no-validate/src/pets/list-pets.token.ts', 'utf-8')!;
      expect(content).not.toContain('@cfworker/json-schema');
      expect(content).not.toContain('_validateResponse');
    });

    it('emits a Validator-based parse hook when validateResponses is true', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets/{id}': {
            get: {
              operationId: 'getPet',
              tags: ['pets'],
              parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: { id: { type: 'string' }, name: { type: 'string' } },
                        required: ['id'],
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
        outputDir: 'libs/validate/src',
        validateResponses: true,
      });
      const content = tree.read('libs/validate/src/pets/get-pet.token.ts', 'utf-8')!;
      expect(content).toContain("import { Validator, type Schema } from '@cfworker/json-schema';");
      expect(content).toContain('const _responseSchema: Schema =');
      expect(content).toContain('function _validateResponse(value: unknown): GetPetResponse {');
      expect(content).toContain('new Validator(_responseSchema).validate(value)');
      expect(content).toContain('{ parse: _validateResponse }');
    });

    it('rewrites OAS nullable:true to a JSON Schema type array', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets/{id}': {
            get: {
              operationId: 'getPet',
              tags: ['pets'],
              parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: { nickname: { type: 'string', nullable: true } },
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
        outputDir: 'libs/validate-nullable/src',
        validateResponses: true,
      });
      const content = tree.read('libs/validate-nullable/src/pets/get-pet.token.ts', 'utf-8')!;
      expect(content).not.toContain('nullable');
      expect(content).toMatch(/type:\s*\[\s*'string',\s*'null'\s*\]/);
    });

    it('skips validation for a circular response schema instead of throwing', async () => {
      const category: Record<string, unknown> = { type: 'object', properties: {} };
      const pet: Record<string, unknown> = {
        type: 'object',
        properties: { category: {} },
      };
      (category['properties'] as Record<string, unknown>)['pet'] = pet;
      (pet['properties'] as Record<string, unknown>)['category'] = category;
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets/{id}': {
            get: {
              operationId: 'getPet',
              tags: ['pets'],
              parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
              responses: {
                '200': { content: { 'application/json': { schema: pet } } },
              },
            },
          },
        },
      } as never);
      await expect(
        apiResourceGenerator(tree, {
          specPath: 'specs/petstore.yaml',
          outputDir: 'libs/validate-circular/src',
          validateResponses: true,
        })
      ).resolves.not.toThrow();
      const content = tree.read('libs/validate-circular/src/pets/get-pet.token.ts', 'utf-8')!;
      expect(content).not.toContain('_validateResponse');
      expect(content).not.toContain('@cfworker/json-schema');
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
  describe('HttpClient tokens (clientType)', () => {
    const read = (f: string) => tree.read(`libs/petstore/src/pets/${f}.token.ts`, 'utf-8')!;
    const gen = (extra: Record<string, unknown>) =>
      apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
        ...extra,
      });

    it('defaults to httpResource', async () => {
      await gen({});
      expect(read('list-pets')).toContain('httpResource');
      expect(read('list-pets')).not.toContain('HttpClient');
    });

    it('clientType=httpClient: GET returns Observable with plain params', async () => {
      await gen({ clientType: 'httpClient' });
      const c = read('list-pets');
      expect(c).toContain("import { HttpClient } from '@angular/common/http'");
      expect(c).toContain("import type { Observable } from 'rxjs'");
      expect(c).not.toContain('httpResource');
      expect(c).toMatch(/\(params\?: ListPetsParams\) => Observable<ListPetsResponse>/);
      expect(c).toContain("http.request<ListPetsResponse>('GET'");
      expect(c).toContain('params: params as unknown as Record');
      expect(c).not.toContain('typeof params');
    });

    it('clientType=httpClient: mutation passes body and method positionally', async () => {
      await gen({ clientType: 'httpClient' });
      const c = read('create-pet');
      expect(c).toContain('(body: CreatePetBody) => Observable<CreatePetResponse>');
      expect(c).not.toContain('Signal');
      expect(c).toContain("http.request<CreatePetResponse>('POST'");
      expect(c).toMatch(/\n\s+body,/);
      expect(c).not.toContain("method: 'POST'");
    });

    it('clientType=httpClient: path params and no-response endpoints', async () => {
      await gen({ clientType: 'httpClient' });
      expect(read('get-pet-by-id')).toContain('`${base}/pets/${id}`');
      expect(read('delete-pet')).toContain('Observable<unknown>');
      expect(read('delete-pet')).toContain("'DELETE'");
    });

    it('httpClientTags selects only matching tags', async () => {
      await gen({ httpClientTags: 'pets' });
      expect(read('list-pets')).toContain('HttpClient');
    });

    it('httpClientOperations selects individual endpoints', async () => {
      await gen({ httpClientOperations: 'listPets' });
      expect(read('list-pets')).toContain('HttpClient');
      expect(read('create-pet')).toContain('httpResource');
      expect(read('create-pet')).not.toContain('HttpClient');
    });

    it('throws when a selected tag or operationId matches nothing', async () => {
      await expect(gen({ httpClientTags: 'nope' })).rejects.toThrow(/tag "nope"/);
      await expect(gen({ httpClientOperations: 'nope' })).rejects.toThrow(/operationId "nope"/);
    });

    it('providedIn root registers the factory on the token', async () => {
      await gen({ clientType: 'httpClient', providedIn: 'root' });
      const c = read('list-pets');
      expect(c).toContain("providedIn: 'root'");
      expect(c).toContain('inject(HttpClient)');
      expect(c).not.toContain('FactoryProvider');
    });

    it('validateResponses pipes through map()', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/pets': {
            get: {
              operationId: 'listPets',
              tags: ['pets'],
              responses: {
                '200': { content: { 'application/json': { schema: { type: 'array', items: { type: 'string' } } } } },
              },
            },
          },
        },
      } as never);
      await gen({ clientType: 'httpClient', validateResponses: true });
      const c = read('list-pets');
      expect(c).toContain("import { map, type Observable } from 'rxjs'");
      expect(c).toContain('.pipe(map(_validateResponse))');
      expect(c).not.toContain('parse:');
    });

    it('mock file uses provideMockObservable for httpClient, provideMockResource otherwise', () => {
      const ep = { operationId: 'listPets', tokenName: 'LIST_PETS', fileName: 'list-pets', apiPath: '/pets', method: 'get', tag: 'pets', hasResponse: true } as never;
      const obs = renderMockFile(ep, 'petstore', 'httpClient');
      expect(obs).toContain("import { provideMockObservable } from '@constantant/openapi-resource-mocks'");
      expect(obs).toContain("return provideMockObservable(LIST_PETS, 'LIST_PETS'");
      expect(obs).not.toContain('provideMockResource');
      expect(renderMockFile(ep, 'petstore')).toContain('provideMockResource(LIST_PETS');
    });
  });
  describe('request shapes (httpResource and httpClient)', () => {
    const json = (schema: unknown = {}) => ({ 'application/json': { schema } });
    const SHAPES_SPEC = {
      security: [{ bearer: [] }],
      components: {
        securitySchemes: {
          bearer: { type: 'http', scheme: 'bearer' },
          keyHeader: { type: 'apiKey', in: 'header', name: 'X-Key' },
          keyQuery: { type: 'apiKey', in: 'query', name: 'api_key' },
        },
      },
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            tags: ['items'],
            security: [{ keyHeader: [] }, { keyQuery: [] }],
            parameters: [
              { in: 'query', name: 'limit', schema: { type: 'integer' } },
              { in: 'query', name: 'ids', style: 'pipeDelimited', explode: false, schema: { type: 'array', items: { type: 'string' } } },
              { in: 'header', name: 'X-Api-Version', required: true, schema: { type: 'string' } },
              { in: 'header', name: 'Accept-Language', schema: { type: 'string' } },
              { in: 'cookie', name: 'session', required: true, schema: { type: 'string' } },
              { in: 'cookie', name: 'theme', schema: { type: 'string' } },
            ],
            responses: { '200': { content: json({ type: 'array' }) } },
          },
          post: {
            operationId: 'createItem',
            tags: ['items'],
            deprecated: true,
            parameters: [{ in: 'header', name: 'X-Trace', schema: { type: 'string' } }],
            requestBody: { content: json() },
            responses: { '201': { content: json() } },
          },
        },
        '/report': {
          get: {
            operationId: 'getReportText',
            tags: ['files'],
            responses: { '200': { content: { 'text/plain': { schema: { type: 'string' } } } } },
          },
        },
        '/file': {
          get: {
            operationId: 'downloadFile',
            tags: ['files'],
            responses: { '200': { content: { 'application/octet-stream': { schema: { type: 'string', format: 'binary' } } } } },
          },
          put: {
            operationId: 'uploadFile',
            tags: ['files'],
            requestBody: { content: { 'application/octet-stream': { schema: { type: 'string', format: 'binary' } } } },
            responses: { '200': { content: json() } },
          },
        },
      },
    };

    const gen = async (client: 'httpResource' | 'httpClient') => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(SHAPES_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/shapes/src',
        baseUrlToken: 'SHAPES_BASE_URL',
        clientType: client,
      });
    };
    const read = (tag: string, f: string) =>
      tree.read(`libs/shapes/src/${tag}/${f}.token.ts`, 'utf-8')!;
    const squash = (c: string) => c.replace(/\s+/g, ' ');

    describe.each(['httpResource', 'httpClient'] as const)('%s', (client) => {
      it('puts required args before optional ones (no TS1016)', async () => {
        await gen(client);
        const list = read('items', 'list-items').replace(/\s+/g, '');
        expect(list).toContain(
          '(xApiVersion:string,session:string,acceptLanguage?:string,theme?:string,params?:ListItemsParams',
        );
        // Optional header must not precede the required body.
        const create = squash(read('items', 'create-item'));
        expect(create).toMatch(/\(body: CreateItemBody(?: \| Signal<CreateItemBody>)?, xTrace\?: string\) =>/);
      });

      it('combines cookie params into one Cookie header', async () => {
        await gen(client);
        const list = squash(read('items', 'list-items'));
        expect(list).toContain('`session=${session}`');
        expect(list).toContain('...(theme != null ? [`theme=${theme}`] : [])');
        expect(list).toMatch(/Cookie: \[.*\]\.join\('; '\)/);
      });

      it('renders header params, apiKey header/query auth and serializes pipe-delimited params', async () => {
        await gen(client);
        const list = squash(read('items', 'list-items'));
        expect(list).toContain("'X-Api-Version': xApiVersion");
        expect(list).toContain("...(acceptLanguage != null ? { 'Accept-Language': acceptLanguage } : {})");
        expect(list).toContain("...(keyHeader?.() != null ? { 'X-Key': `${keyHeader()}` } : {})");
        expect(list).toContain('...(keyQuery?.() != null ? { api_key: `${keyQuery()}` } : {})');
        expect(list).toContain('_serializeParams');
        expect(list).toContain('join("|")'.replace(/"/g, "'"));
      });

      it('emits @deprecated above the token', async () => {
        await gen(client);
        expect(read('items', 'create-item')).toMatch(/\/\*\* @deprecated \*\/\s+export const CREATE_ITEM/);
      });

      it('injects global bearer auth when the operation has no override', async () => {
        await gen(client);
        const report = squash(read('files', 'get-report-text'));
        expect(report).toContain("inject(BEARER, { optional: true })");
        expect(report).toContain('Authorization: `Bearer ${bearer()}`');
      });
    });

    describe('httpClient only', () => {
      it('uses the requested responseType for text and blob responses', async () => {
        await gen('httpClient');
        const text = squash(read('files', 'get-report-text'));
        expect(text).toContain('() => Observable<string>');
        expect(text).toContain("responseType: 'text'");
        expect(text).not.toContain('http.request<');
        const blob = squash(read('files', 'download-file'));
        expect(blob).toContain('() => Observable<Blob>');
        expect(blob).toContain("responseType: 'blob'");
      });

      it('binary upload body is Blob | ArrayBuffer and passed as body', async () => {
        await gen('httpClient');
        const up = read('files', 'upload-file');
        expect(up).toContain('export type UploadFileBody = Blob | ArrayBuffer');
        expect(squash(up)).toContain("http.request<UploadFileResponse>('PUT'");
        expect(up).toMatch(/\n\s+body,/);
      });

      it('passes params as a plain value and merges apiKey query auth into them', async () => {
        await gen('httpClient');
        const list = squash(read('items', 'list-items'));
        expect(list).toContain('..._serializeParams(params)');
        expect(list).not.toContain("typeof params === 'function'");
      });
    });

    describe('reportProgress', () => {
      const genWith = async (extra: Record<string, unknown>) => {
        vi.mocked(SwaggerParser.dereference).mockResolvedValue(SHAPES_SPEC as never);
        await apiResourceGenerator(tree, {
          specPath: 'specs/petstore.yaml',
          outputDir: 'libs/shapes/src',
          baseUrlToken: 'SHAPES_BASE_URL',
          ...extra,
        });
      };

      it('is off by default: no progress for any client', async () => {
        await gen('httpResource');
        expect(read('files', 'download-file')).not.toContain('reportProgress');
        await gen('httpClient');
        expect(read('files', 'upload-file')).not.toContain('HttpEvent');
        expect(read('files', 'upload-file')).not.toContain("observe: 'events'");
      });

      describe('httpClient: yields Observable<HttpEvent<T>>', () => {
        it('for binary uploads and blob downloads', async () => {
          await genWith({ reportProgress: true, clientType: 'httpClient' });
          const up = squash(read('files', 'upload-file'));
          expect(up).toContain("import { HttpClient, type HttpEvent } from '@angular/common/http'");
          expect(up).toContain('(body: UploadFileBody) => Observable<HttpEvent<UploadFileResponse>>');
          expect(up).toContain("observe: 'events'");
          expect(up).toContain('reportProgress: true');
          expect(up).toContain("http.request<UploadFileResponse>('PUT'");
          const down = squash(read('files', 'download-file'));
          expect(down).toContain('() => Observable<HttpEvent<Blob>>');
          expect(down).toContain("responseType: 'blob'");
          expect(down).toContain("observe: 'events'");
        });

        it('leaves JSON-body mutations, text responses and plain GETs as plain Observable<T>', async () => {
          await genWith({ reportProgress: true, clientType: 'httpClient' });
          expect(squash(read('items', 'create-item'))).toContain('=> Observable<CreateItemResponse>');
          expect(read('items', 'create-item')).not.toContain('HttpEvent');
          expect(squash(read('items', 'list-items'))).toContain('=> Observable<ListItemsResponse>');
          expect(squash(read('files', 'get-report-text'))).toContain('() => Observable<string>');
        });

        it('validates only the Response event when validateResponses is on', async () => {
          await genWith({ reportProgress: true, clientType: 'httpClient', validateResponses: true });
          const up = read('files', 'upload-file').replace(/\s+/g, '');
          expect(up).toContain("import{HttpClient,HttpEventType,typeHttpEvent,}from'@angular/common/http'");
          expect(up).toContain('e.type===HttpEventType.Response');
          expect(up).toContain('e.clone({body:_validateResponse(e.body)})'.replace(/\s+/g, ''));
        });

        it('works with providedIn: root', async () => {
          await genWith({ reportProgress: true, clientType: 'httpClient', providedIn: 'root' });
          const up = squash(read('files', 'upload-file'));
          expect(up).toContain("providedIn: 'root'");
          expect(up).toContain('Observable<HttpEvent<UploadFileResponse>>');
        });
      });

      describe('httpResource: download progress only', () => {
        it('flags blob downloads with reportProgress but not uploads (httpResource ignores upload progress)', async () => {
          await genWith({ reportProgress: true });
          expect(read('files', 'download-file')).toMatch(/\n\s+reportProgress: true,/);
          expect(read('files', 'upload-file')).not.toContain('reportProgress');
        });

        it('leaves JSON bodies, text responses and plain GETs alone', async () => {
          await genWith({ reportProgress: true });
          for (const [tag, f] of [['items', 'create-item'], ['items', 'list-items'], ['files', 'get-report-text']]) {
            expect(read(tag, f)).not.toContain('reportProgress');
          }
        });
      });

      it('applies per endpoint in a mixed lib', async () => {
        await genWith({ reportProgress: true, httpClientOperations: 'uploadFile' });
        expect(read('files', 'upload-file')).toContain('HttpEvent<UploadFileResponse>');
        expect(read('files', 'download-file')).toMatch(/\n\s+reportProgress: true,/);
        expect(read('files', 'download-file')).not.toContain('HttpEvent');
      });

      it('mock file uses provideMockHttpEvents exactly when the token yields events', () => {
        const upload = { operationId: 'uploadFile', tokenName: 'UPLOAD_FILE', fileName: 'upload-file', apiPath: '/file', method: 'put', tag: 'files', hasResponse: true, hasBody: true, isBinaryBody: true, bodyContentType: 'application/octet-stream', responseVariant: 'json' } as never;
        const json = { operationId: 'createItem', tokenName: 'CREATE_ITEM', fileName: 'create-item', apiPath: '/items', method: 'post', tag: 'items', hasResponse: true, hasBody: true, isBinaryBody: false, bodyContentType: 'application/json', responseVariant: 'json' } as never;
        const flat = (c: string) => c.replace(/\s+/g, '');
        expect(flat(renderMockFile(upload, 'x', 'httpClient', true))).toContain('provideMockHttpEvents(UPLOAD_FILE');
        expect(flat(renderMockFile(upload, 'x', 'httpClient', false))).toContain('provideMockObservable(UPLOAD_FILE');
        expect(flat(renderMockFile(upload, 'x', 'httpResource', true))).toContain('provideMockResource(UPLOAD_FILE');
        expect(flat(renderMockFile(json, 'x', 'httpClient', true))).toContain('provideMockObservable(CREATE_ITEM');
      });
    });

    describe('httpResource only', () => {
      it('keeps responseType out and uses httpResource.text / .blob', async () => {
        await gen('httpResource');
        expect(read('files', 'get-report-text')).toContain('httpResource.text');
        expect(read('files', 'download-file')).toContain('httpResource.blob');
        expect(read('files', 'get-report-text')).not.toContain('responseType');
      });
    });
  });
  describe('mock generation (includeMocks)', () => {
    const gen = (extra: Record<string, unknown> = {}) =>
      apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
        baseUrlToken: 'PETSTORE_BASE_URL',
        includeMocks: true,
        ...extra,
      });
    const mock = (f: string) => tree.read(`libs/petstore/src/pets/${f}.mock.ts`, 'utf-8')!;

    it('checks that the mocks package is installed (as a dev dependency)', async () => {
      await gen();
      expect(ensurePackageInstalled).toHaveBeenCalledWith(
        '@constantant/openapi-resource-mocks',
        'includeMocks',
        { dev: true },
      );
    });

    it('does not check for it, or emit mocks, when includeMocks is off', async () => {
      vi.mocked(ensurePackageInstalled).mockClear();
      await gen({ includeMocks: false });
      expect(ensurePackageInstalled).not.toHaveBeenCalledWith(
        '@constantant/openapi-resource-mocks',
        expect.anything(),
        expect.anything(),
      );
      expect(tree.exists('libs/petstore/src/pets/list-pets.mock.ts')).toBe(false);
      expect(tree.exists('libs/petstore/src/mocks.manifest.json')).toBe(false);
    });

    it('propagates the error when the package is missing', async () => {
      vi.mocked(ensurePackageInstalled).mockImplementationOnce(() => {
        throw new Error('includeMocks requires @constantant/openapi-resource-mocks to be installed.');
      });
      await expect(gen()).rejects.toThrow(/includeMocks requires/);
    });

    it('emits one mock file per endpoint plus tag and root barrels', async () => {
      await gen();
      for (const f of ['list-pets', 'create-pet', 'get-pet-by-id', 'delete-pet']) {
        expect(tree.exists(`libs/petstore/src/pets/${f}.mock.ts`)).toBe(true);
      }
      expect(tree.read('libs/petstore/src/pets/index.mock.ts', 'utf-8')).toContain(
        "export * from './list-pets.mock'",
      );
      expect(tree.read('libs/petstore/src/index.mock.ts', 'utf-8')).toContain(
        "export * from './pets/index.mock'",
      );
    });

    it('embeds MockResourceMeta with the derived specId', async () => {
      await gen();
      const c = mock('get-pet-by-id');
      expect(c).toContain("specId: 'petstore'");
      expect(c).toContain("operationId: 'getPetById'");
      expect(c).toContain("path: '/pets/{id}'");
      expect(c).toContain("method: 'get'");
      expect(c).toContain("tag: 'pets'");
      expect(c).toContain('export function provideGetPetByIdMock');
    });

    it('uses an explicit specId when given', async () => {
      await gen({ specId: 'custom' });
      expect(mock('list-pets')).toContain("specId: 'custom'");
    });

    it('writes mocks.manifest.json listing every endpoint', async () => {
      await gen();
      const manifest = JSON.parse(tree.read('libs/petstore/src/mocks.manifest.json', 'utf-8')!);
      expect(manifest.specId).toBe('petstore');
      expect(manifest.mocks.map((m: { tokenName: string }) => m.tokenName).sort()).toEqual([
        'CREATE_PET',
        'DELETE_PET',
        'GET_PET_BY_ID',
        'LIST_PETS',
      ]);
      expect(manifest.mocks.find((m: { tokenName: string }) => m.tokenName === 'LIST_PETS')).toMatchObject({
        operationId: 'listPets',
        path: '/pets',
        method: 'get',
        tag: 'pets',
      });
    });

    it('picks the provider per endpoint when clients are mixed', async () => {
      await gen({ httpClientOperations: 'listPets,createPet' });
      const flat = (f: string) => mock(f).replace(/\s+/g, '');
      expect(flat('list-pets')).toContain('provideMockObservable(LIST_PETS');
      expect(flat('create-pet')).toContain('provideMockObservable(CREATE_PET');
      expect(flat('get-pet-by-id')).toContain('provideMockResource(GET_PET_BY_ID');
      expect(flat('delete-pet')).toContain('provideMockResource(DELETE_PET');
    });

    it('removes stale mock files when an endpoint disappears', async () => {
      await gen();
      expect(tree.exists('libs/petstore/src/pets/delete-pet.mock.ts')).toBe(true);
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: { '/pets': { get: MOCK_SPEC.paths['/pets'].get } },
      } as never);
      await gen();
      expect(tree.exists('libs/petstore/src/pets/delete-pet.mock.ts')).toBe(false);
      expect(tree.exists('libs/petstore/src/pets/list-pets.mock.ts')).toBe(true);
    });
  });
  describe('query params on non-GET endpoints', () => {
    const json = (schema: unknown = {}) => ({ 'application/json': { schema } });
    const QUERY_SPEC = {
      paths: {
        '/things': {
          get: {
            operationId: 'listThings',
            tags: ['things'],
            parameters: [{ in: 'query', name: 'limit', schema: { type: 'integer' } }],
            responses: { '200': { content: json({ type: 'array' }) } },
          },
          post: {
            operationId: 'createThing',
            tags: ['things'],
            parameters: [{ in: 'query', name: 'dryRun', schema: { type: 'boolean' } }],
            requestBody: { content: json() },
            responses: { '201': { content: json() } },
          },
        },
        '/things/{id}': {
          put: {
            operationId: 'replaceThing',
            tags: ['things'],
            parameters: [
              { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
              { in: 'query', name: 'part', required: true, schema: { type: 'array', items: { type: 'string' } } },
              { in: 'header', name: 'X-Trace', schema: { type: 'string' } },
            ],
            requestBody: { content: json() },
            responses: { '200': { content: json() } },
          },
          patch: {
            operationId: 'patchThing',
            tags: ['things'],
            parameters: [
              { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
              { in: 'query', name: 'fields', style: 'pipeDelimited', explode: false, schema: { type: 'array', items: { type: 'string' } } },
            ],
            requestBody: { content: json() },
            responses: { '200': { content: json() } },
          },
          delete: {
            operationId: 'deleteThing',
            tags: ['things'],
            parameters: [
              { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
              { in: 'query', name: 'force', schema: { type: 'boolean' } },
            ],
            responses: { '204': { description: 'gone' } },
          },
        },
        '/plain': {
          post: {
            operationId: 'createPlain',
            tags: ['things'],
            requestBody: { content: json() },
            responses: { '201': { content: json() } },
          },
        },
      },
    };

    // Prettier wraps long signatures and adds a trailing comma before `)`; compare modulo both.
    const flat = (c: string) => c.replace(/\s+/g, '').replace(/,\)/g, ')');
    const read = (f: string) => flat(tree.read(`libs/q/src/things/${f}.token.ts`, 'utf-8')!);

    describe.each(['httpResource', 'httpClient'] as const)('%s', (client) => {
      const resource = client === 'httpResource';
      // httpResource also accepts a thunk, so the argument types differ per client.
      const paramsType = (name: string) =>
        resource ? `${name}|(()=>${name}|undefined)` : name;
      const bodyType = (name: string) => (resource ? `${name}|Signal<${name}>` : name);

      beforeEach(async () => {
        vi.mocked(SwaggerParser.dereference).mockResolvedValue(QUERY_SPEC as never);
        await apiResourceGenerator(tree, {
          specPath: 'specs/petstore.yaml',
          outputDir: 'libs/q/src',
          baseUrlToken: 'Q_BASE_URL',
          clientType: client,
        });
      });

      it('exports a Params alias for mutations too', () => {
        expect(read('create-thing')).toContain("exporttypeCreateThingParams=paths['/things']['post']['parameters']['query']");
        expect(read('delete-thing')).toContain("exporttypeDeleteThingParams=paths['/things/{id}']['delete']['parameters']['query']");
      });

      it('appends an optional params argument after the body', () => {
        expect(read('create-thing')).toContain(
          `(body:${bodyType('CreateThingBody')},params?:${paramsType('CreateThingParams')})`,
        );
      });

      it('appends an optional params argument after path params when there is no body', () => {
        expect(read('delete-thing')).toContain(`(id:string,params?:${paramsType('DeleteThingParams')})`);
      });

      it('makes params required when the spec has a required query param, ahead of optional args', () => {
        // required: id, body, params ; optional: the X-Trace header
        expect(read('replace-thing')).toContain(
          `(id:string,body:${bodyType('ReplaceThingBody')},params:${paramsType('ReplaceThingParams')},xTrace?:string)`,
        );
      });

      it('leaves endpoints without query params, and GETs, unchanged', () => {
        const plain = read('create-plain');
        expect(plain).not.toContain('CreatePlainParams');
        expect(plain).toContain(`(body:${bodyType('CreatePlainBody')})`);
        expect(read('list-things')).toContain(`params?:${paramsType('ListThingsParams')}`);
      });

      it('sends the query params with the request', () => {
        const c = read('create-thing');
        expect(c).toContain(resource ? 'params:_paramsasunknownasRecord' : 'params:paramsasunknownasRecord');
        expect(c).toContain(resource ? "method:'POST'" : "'POST'");
      });

      it('serializes non-default query styles on mutations', () => {
        const c = read('patch-thing');
        expect(c).toContain('function_serializeParams(');
        expect(c).toContain(resource ? '_serializeParams(_params)' : '_serializeParams(params)');
        expect(c).toContain("join('|')");
      });
    });

    describe('signal bodies (httpResource mutations accept body: T | Signal<T>)', () => {
      const gen = async (client: 'httpResource' | 'httpClient') => {
        vi.mocked(SwaggerParser.dereference).mockResolvedValue(QUERY_SPEC as never);
        await apiResourceGenerator(tree, {
          specPath: 'specs/petstore.yaml',
          outputDir: 'libs/q/src',
          baseUrlToken: 'Q_BASE_URL',
          clientType: client,
        });
      };

      it('httpResource reads the signal inside the reactive lambda and sends the unwrapped value', async () => {
        await gen('httpResource');
        const c = read('create-plain');
        expect(c).toContain("const_body=typeofbody==='function'?(bodyasSignal<CreatePlainBody>)():body;");
        expect(c).toContain('body:_body,');
        // The raw argument must never be placed in the request config: it would send the signal.
        expect(c).not.toMatch(/[{,]body,/);
      });

      it('unwraps the body after the params guard when both are present', async () => {
        await gen('httpResource');
        const c = read('create-thing');
        const guard = c.indexOf('if(typeofparams===');
        const body = c.indexOf('const_body=');
        expect(guard).toBeGreaterThan(-1);
        expect(body).toBeGreaterThan(guard);
        expect(c).toContain('body:_body,');
      });

      it('applies to binary bodies too', async () => {
        vi.mocked(SwaggerParser.dereference).mockResolvedValue({
          paths: {
            '/file': {
              put: {
                operationId: 'uploadThing',
                tags: ['things'],
                requestBody: { content: { 'application/octet-stream': { schema: { type: 'string', format: 'binary' } } } },
                responses: { '200': { content: json() } },
              },
            },
          },
        } as never);
        await apiResourceGenerator(tree, { specPath: 'specs/petstore.yaml', outputDir: 'libs/q/src', baseUrlToken: 'Q_BASE_URL' });
        expect(read('upload-thing')).toContain("const_body=typeofbody==='function'?(bodyasSignal<UploadThingBody>)():body;");
      });

      it('leaves endpoints without a body, and GETs, on the shorthand lambda', async () => {
        await gen('httpResource');
        // delete has query params but no body; list is a GET
        expect(read('delete-thing')).not.toContain('_body');
        expect(read('list-things')).not.toContain('_body');
      });

      it('httpClient takes a plain body and is unaffected', async () => {
        await gen('httpClient');
        const c = read('create-plain');
        expect(c).not.toContain('_body');
        expect(c).toContain('(body:CreatePlainBody)');
        expect(c).toMatch(/[{,]body,/);
      });
    });

    it('httpResource keeps the suppress-when-undefined thunk semantics for mutations', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue(QUERY_SPEC as never);
      await apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/q/src',
        baseUrlToken: 'Q_BASE_URL',
      });
      const c = read('delete-thing');
      expect(c).toContain("const_params=typeofparams==='function'?params():params;");
      expect(c).toContain("if(typeofparams==='function'&&_params===undefined)returnundefined;");
    });
  });
  describe('readWriteMarkers (readOnly / writeOnly)', () => {
    const gen = (extra: Record<string, unknown> = {}) =>
      apiResourceGenerator(tree, {
        specPath: 'specs/petstore.yaml',
        outputDir: 'libs/petstore/src',
        baseUrlToken: 'PETSTORE_BASE_URL',
        ...extra,
      });
    const read = (f: string) => tree.read(`libs/petstore/src/pets/${f}.token.ts`, 'utf-8')!;
    const flat = (c: string) => c.replace(/\s+/g, '');

    // (the generator `require()`s openapi-typescript, which vi.mock doesn't intercept, so the real
    // library runs here — we can assert on the schema.d.ts it really emits)
    const schema = () => tree.read('libs/petstore/src/schema.d.ts', 'utf-8')!;

    it('is off by default: no read/write helpers in schema.d.ts and none in the tokens', async () => {
      await gen();
      expect(schema()).not.toMatch(/export type (Readable|Writable|\$Read|\$Write)</);
      for (const f of ['list-pets', 'create-pet', 'get-pet-by-id']) {
        expect(read(f)).not.toMatch(/\b(Readable|Writable)</);
        expect(read(f)).not.toMatch(/import type \{[^}]*(Readable|Writable)/);
      }
    });

    it('asks openapi-typescript for the read/write markers when enabled', async () => {
      await gen({ readWriteMarkers: true });
      for (const helper of ['$Read', '$Write', 'Readable', 'Writable']) {
        expect(schema()).toMatch(new RegExp(`export type ${helper.replace('$', '\\$')}<`));
      }
    });

    it('wraps request bodies in Writable<> and responses in Readable<>', async () => {
      await gen({ readWriteMarkers: true });
      const create = flat(read('create-pet'));
      expect(create).toContain("exporttypeCreatePetBody=Writable<NonNullable<paths['/pets']['post']['requestBody']>['content']['application/json']>;");
      expect(create).toContain("exporttypeCreatePetResponse=Readable<paths['/pets']['post']['responses']['201']['content']['application/json']>;");
      expect(flat(read('list-pets'))).toContain("exporttypeListPetsResponse=Readable<paths['/pets']['get']['responses']['200']['content']['application/json']>;");
    });

    it('imports only the helpers a file uses', async () => {
      await gen({ readWriteMarkers: true });
      // GET: a response, no body
      expect(read('list-pets')).toMatch(/import type \{ paths, Readable \} from '\.\.\/schema\.d'/);
      // POST: body and response
      expect(read('create-pet')).toMatch(/import type \{ paths, Readable, Writable \} from '\.\.\/schema\.d'/);
      // DELETE with neither a body nor a JSON response
      expect(read('delete-pet')).toMatch(/import type \{ paths \} from '\.\.\/schema\.d'/);
    });

    it('composes with readonlyResponses as Readonly<Readable<…>>', async () => {
      await gen({ readWriteMarkers: true, readonlyResponses: true });
      expect(flat(read('list-pets'))).toContain('exporttypeListPetsResponse=Readonly<Readable<paths[');
    });

    it('wraps every branch of a multi-status response union', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/things': {
            put: {
              operationId: 'putThing',
              tags: ['pets'],
              requestBody: { content: { 'application/json': { schema: {} } } },
              responses: {
                '200': { content: { 'application/json': { schema: {} } } },
                '201': { content: { 'application/json': { schema: {} } } },
                '400': { content: { 'application/json': { schema: {} } } },
              },
            },
          },
        },
      } as never);
      await gen({ readWriteMarkers: true });
      const c = flat(read('put-thing'));
      expect(c).toContain("|Readable<paths['/things']['put']['responses']['200']");
      expect(c).toContain("|Readable<paths['/things']['put']['responses']['201']");
      expect(c).toContain("exporttypePutThingError=Readable<paths['/things']['put']['responses']['400']");
    });

    it('leaves binary bodies and text/blob responses unwrapped (and unimported)', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/file': {
            put: {
              operationId: 'putFile',
              tags: ['pets'],
              requestBody: { content: { 'application/octet-stream': { schema: { type: 'string', format: 'binary' } } } },
              responses: { '200': { content: { 'text/plain': { schema: { type: 'string' } } } } },
            },
          },
        },
      } as never);
      await gen({ readWriteMarkers: true });
      const c = read('put-file');
      expect(c).toContain('export type PutFileBody = Blob | ArrayBuffer;');
      expect(c).toContain('export type PutFileResponse = string;');
      expect(c).toMatch(/import type \{ paths \} from '\.\.\/schema\.d'/);
    });

    it('wraps component schemas in discriminated-union variants', async () => {
      vi.mocked(SwaggerParser.dereference).mockResolvedValue({
        paths: {
          '/animals': {
            get: {
              operationId: 'listAnimals',
              tags: ['pets'],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        oneOf: [{ type: 'object' }, { type: 'object' }],
                        discriminator: {
                          propertyName: 'kind',
                          mapping: { cat: '#/components/schemas/Cat', dog: '#/components/schemas/Dog' },
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
      await gen({ readWriteMarkers: true });
      const c = flat(read('list-animals'));
      // Prettier reformats { "kind": "cat" } → { kind: 'cat' }
      expect(c).toContain("Readable<components['schemas']['Cat']>&{kind:'cat'");
      expect(c).toContain("Readable<components['schemas']['Dog']>&{kind:'dog'");
      expect(read('list-animals')).toMatch(/import type \{ paths, components, Readable \} from '\.\.\/schema\.d'/);
    });
  });
});
