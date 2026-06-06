import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
} from '@nx/devkit';
import * as fs from 'fs';
import * as jsYaml from 'js-yaml';
import openapiTS from 'openapi-typescript';
import * as path from 'path';
import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { buildEndpoints } from './parse-spec';
import { renderTokenFile } from './render-token';

export interface ApiResourceGeneratorSchema {
  specPath: string;
  outputDir: string;
  baseUrlToken?: string;
  tagFilter?: string;
  namingConvention?: 'camel' | 'kebab';
  providedIn?: 'root' | 'none';
}

/** Replace $ref values that point to non-YAML/JSON files with {} so
 *  swagger-parser doesn't try to load markdown or other binary assets. */
function stripNonSchemaRefs(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(stripNonSchemaRefs);
  if (obj && typeof obj === 'object') {
    const record = obj as Record<string, unknown>;
    if ('$ref' in record && typeof record['$ref'] === 'string') {
      const ref = record['$ref'];
      if (!ref.startsWith('#') && !/\.(json|ya?ml)(#.*)?$/i.test(ref)) {
        return {};
      }
    }
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(record)) {
      result[key] = stripNonSchemaRefs(value);
    }
    return result;
  }
  return obj;
}

export async function apiResourceGenerator(
  tree: Tree,
  options: ApiResourceGeneratorSchema
): Promise<void> {
  const {
    specPath,
    outputDir,
    baseUrlToken = 'API_BASE_URL',
    tagFilter,
    namingConvention = 'kebab',
    providedIn = 'none',
  } = options;

  const allowedTags = tagFilter
    ? tagFilter
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : null;

  // 1. Parse spec with js-yaml, strip any $refs pointing to non-spec files
  //    (e.g. x-topics.$ref: ./docs/getting-started.md in the travel spec).
  //    Write the cleaned spec next to the original so relative file $refs
  //    within the spec still resolve when swagger-parser dereferences.
  const absoluteSpecPath = path.resolve(specPath);
  const rawParsed = jsYaml.load(fs.readFileSync(absoluteSpecPath, 'utf-8'));
  const cleanedParsed = stripNonSchemaRefs(rawParsed);
  const tmpClean = path
    .join(path.dirname(absoluteSpecPath), `_tmp_oas_${Date.now()}.json`)
    .replace(/\\/g, '/');

  try {
    fs.writeFileSync(tmpClean, JSON.stringify(cleanedParsed));

    // 2. Emit schema.d.ts via openapi-typescript programmatic API, using the
    //    cleaned spec (not the dereferenced result — dereferenced Stripe has
    //    circular refs; openapi-typescript resolves $refs itself).
    const schemaDts = await openapiTS(tmpClean);
    tree.write(joinPathFragments(outputDir, 'schema.d.ts'), schemaDts);

    // 3. Dereference for endpoint extraction (may produce circular objects —
    //    that's fine because we only iterate over it, never serialize it).
    const api = (await SwaggerParser.dereference(tmpClean)) as OpenAPIV3.Document;

    // 4. Emit api-base-url.token.ts from the EJS template in files/
    generateFiles(tree, path.join(__dirname, 'files'), outputDir, {
      baseUrlToken,
      tmpl: '',
    });

    // 5. Build EndpointModels from the already-dereferenced API
    const endpoints = buildEndpoints(api, allowedTags, namingConvention);

    // 6. Group by tag
    const byTag = new Map<string, typeof endpoints>();
    for (const ep of endpoints) {
      if (!byTag.has(ep.tag)) byTag.set(ep.tag, []);
      byTag.get(ep.tag)!.push(ep);
    }

    // 7. One token file per endpoint + per-tag barrel index
    for (const [tag, tagEndpoints] of byTag) {
      const tagDir = joinPathFragments(outputDir, tag);

      for (const ep of tagEndpoints) {
        tree.write(
          joinPathFragments(tagDir, `${ep.fileName}.token.ts`),
          renderTokenFile(ep, baseUrlToken, providedIn)
        );
      }

      const tagBarrel =
        tagEndpoints
          .map((ep) => `export * from './${ep.fileName}.token';`)
          .join('\n') + '\n';
      tree.write(joinPathFragments(tagDir, 'index.ts'), tagBarrel);
    }

    // 8. Root barrel index (includes api-base-url token for app.config.ts providers)
    const rootBarrel =
      `export * from './api-base-url.token';\n` +
      [...byTag.keys()]
        .map((tag) => `export * from './${tag}';`)
        .join('\n') + '\n';
    tree.write(joinPathFragments(outputDir, 'index.ts'), rootBarrel);
  } finally {
    try {
      fs.unlinkSync(tmpClean);
    } catch {
      /* ignore */
    }
  }

  await formatFiles(tree);
}

export default apiResourceGenerator;
