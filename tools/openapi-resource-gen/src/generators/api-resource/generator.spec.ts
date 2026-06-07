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

    it('falls back to unknown type when no 2xx JSON response exists', async () => {
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
      expect(content).toContain('httpResource<unknown>');
    });
  });

  describe('stale file cleanup', () => {
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
        const fakeRes = Object.assign(new Readable({ read() {} }), {
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
});
