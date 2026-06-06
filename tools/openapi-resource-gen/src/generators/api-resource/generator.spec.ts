import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@apidevtools/swagger-parser', () => ({
  default: { dereference: vi.fn() },
}));

vi.mock('openapi-typescript', () => ({
  default: vi.fn().mockResolvedValue('export type paths = {};\n'),
  COMMENT_HEADER: '',
}));

import SwaggerParser from '@apidevtools/swagger-parser';
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
});
