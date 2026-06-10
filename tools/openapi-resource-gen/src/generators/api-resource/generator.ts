import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  updateJson,
} from '@nx/devkit';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import * as jsYaml from 'js-yaml';
// openapi-typescript ships as ESM-only; use the bundled CJS build so this
// CommonJS generator can call it without a dynamic import().
// v6: module.exports = fn (returns string); v7: exports.default = fn (returns ts.Node[])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _openapiTSMod: any = require('openapi-typescript/dist/index.cjs');
const _openapiTS: (source: string | URL) => Promise<unknown> =
  typeof _openapiTSMod === 'function' ? _openapiTSMod : _openapiTSMod.default;
const _astToString: ((nodes: unknown[]) => string) | undefined =
  typeof _openapiTSMod === 'function' ? undefined : _openapiTSMod.astToString;
import * as path from 'path';
import { pathToFileURL } from 'url';
import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { buildEndpoints, parseSecuritySchemes } from './parse-spec';
import { renderTokenFile, renderSecurityTokenFile } from './render-token';
import { renderMockFile } from './render-mock-file';
import type { SecuritySchemeModel } from './endpoint-model';

export interface ApiResourceGeneratorSchema {
  specPath: string;
  outputDir: string;
  baseUrlToken?: string;
  tagFilter?: string;
  namingConvention?: 'camel' | 'kebab';
  providedIn?: 'root' | 'none';
  includeMocks?: boolean;
  /** Identifier embedded in MockResourceMeta and mocks.manifest.json. */
  specId?: string;
}

/** Derive a specId from the baseUrlToken: PETSTORE_BASE_URL → petstore */
function deriveSpecId(baseUrlToken: string): string {
  return baseUrlToken
    .replace(/_BASE_URL$/i, '')
    .toLowerCase()
    .replace(/_/g, '-');
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

/** Download a URL to a local temp file. Returns the temp file path. */
function fetchSpecUrl(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https://') ? https : http;
    const file = fs.createWriteStream(destPath);
    proto
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(destPath, () => undefined);
          reject(
            new Error(
              `Failed to fetch spec from ${url}: HTTP ${res.statusCode ?? 'unknown'}`
            )
          );
          return;
        }
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve()));
      })
      .on('error', (err) => {
        file.close();
        fs.unlink(destPath, () => undefined);
        reject(new Error(`Failed to fetch spec from ${url}: ${err.message}`));
      });
  });
}

/** Add a /{lib}/mock path alias to tsconfig.base.json alongside the existing /{lib} alias. */
function addMockPathAlias(tree: Tree, outputDir: string): void {
  const tsconfigPath = 'tsconfig.base.json';
  if (!tree.exists(tsconfigPath)) return;

  const normalizedDir = outputDir.replace(/\\/g, '/').replace(/\/$/, '');
  const indexTsValue = `${normalizedDir}/index.ts`;
  const indexMockTsValue = `${normalizedDir}/index.mock.ts`;

  updateJson(tree, tsconfigPath, (json) => {
    const paths = json?.compilerOptions?.paths as Record<string, string[]> | undefined;
    if (!paths) return json;

    const existingKey = Object.keys(paths).find((key) =>
      paths[key].some((v) => v.replace(/\\/g, '/') === indexTsValue),
    );
    if (!existingKey) return json;

    const mockKey = `${existingKey}/mock`;
    if (!paths[mockKey]) {
      paths[mockKey] = [indexMockTsValue];
    }
    return json;
  });
}

/** Recursively collect all file paths under a tree directory. */
function collectTreeFiles(tree: Tree, dir: string): string[] {
  const result: string[] = [];
  if (!tree.exists(dir)) return result;
  for (const child of tree.children(dir)) {
    const childPath = joinPathFragments(dir, child);
    if (tree.isFile(childPath)) {
      result.push(childPath);
    } else {
      result.push(...collectTreeFiles(tree, childPath));
    }
  }
  return result;
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
    includeMocks = false,
  } = options;

  const specId = options.specId ?? deriveSpecId(baseUrlToken);

  if (includeMocks) {
    try {
      require.resolve('@constantant/openapi-resource-mocks');
    } catch {
      throw new Error(
        'includeMocks requires @constantant/openapi-resource-mocks to be installed.\n' +
        'Run: npm install -D @constantant/openapi-resource-mocks',
      );
    }
  }

  const allowedTags = tagFilter
    ? tagFilter
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : null;

  // Snapshot which token/security/mock files already exist so we can delete stale
  // ones that this run no longer produces.
  const preExistingFiles = new Set(
    collectTreeFiles(tree, outputDir).filter(
      (f) =>
        f.endsWith('.token.ts') ||
        f.endsWith('.security-token.ts') ||
        f.endsWith('.mock.ts') ||
        f.endsWith('mocks.manifest.json'),
    ),
  );

  const isUrl =
    specPath.startsWith('http://') || specPath.startsWith('https://');

  // For URL specs, download to a temp file alongside the workspace root so
  // relative file $refs in the spec (rare for remote specs) still resolve.
  const tmpDownload = isUrl
    ? path.join(process.cwd(), `_tmp_oas_download_${Date.now()}.yaml`).replace(/\\/g, '/')
    : null;

  // 1. Parse spec with js-yaml, strip any $refs pointing to non-spec files
  //    (e.g. x-topics.$ref: ./docs/getting-started.md in the travel spec).
  //    Write the cleaned spec next to the original so relative file $refs
  //    within the spec still resolve when swagger-parser dereferences.
  let absoluteSpecPath: string;
  if (isUrl) {
    await fetchSpecUrl(specPath, tmpDownload!);
    absoluteSpecPath = tmpDownload!;
  } else {
    absoluteSpecPath = path.resolve(specPath);
    if (!fs.existsSync(absoluteSpecPath)) {
      throw new Error(`Spec file not found: ${absoluteSpecPath}`);
    }
  }

  let rawParsed: unknown;
  try {
    rawParsed = jsYaml.load(fs.readFileSync(absoluteSpecPath, 'utf-8'));
  } catch (e) {
    throw new Error(`Failed to parse spec as YAML/JSON: ${(e as Error).message}`, { cause: e });
  }

  // Validate it looks like an OpenAPI 3.x document before doing any work.
  const specObj = rawParsed as Record<string, unknown> | null;
  if (!specObj || typeof specObj !== 'object') {
    throw new Error(`Spec does not appear to be a valid YAML/JSON document: ${specPath}`);
  }
  const openapiVersion = String(specObj['openapi'] ?? '');
  if (!openapiVersion.startsWith('3')) {
    throw new Error(
      `Only OpenAPI 3.x specs are supported. Found: "${openapiVersion || '(no openapi field)'}". ` +
      `For Swagger 2.x specs, convert first with swagger2openapi.`
    );
  }
  if (!specObj['paths'] || typeof specObj['paths'] !== 'object') {
    throw new Error(
      `No "paths" object found in spec. Is "${specPath}" a valid OpenAPI 3.x file?`
    );
  }

  const cleanedParsed = stripNonSchemaRefs(rawParsed);
  const tmpClean = path.join(path.dirname(absoluteSpecPath), `_tmp_oas_${Date.now()}.json`);
  // v7 requires a URL object (plain paths are treated as document content by Redocly's parser)
  const tmpCleanUrl = pathToFileURL(tmpClean);

  // Track every file path written in this run to detect stale files.
  const writtenFiles = new Set<string>();

  try {
    fs.writeFileSync(tmpClean, JSON.stringify(cleanedParsed));

    // 2. Emit schema.d.ts via openapi-typescript programmatic API, using the
    //    cleaned spec (not the dereferenced result — dereferenced Stripe has
    //    circular refs; openapi-typescript resolves $refs itself).
    let schemaDts: string;
    try {
      const result = await _openapiTS(tmpCleanUrl);
      schemaDts = typeof result === 'string' ? result : _astToString!(result as unknown[]);
    } catch (e) {
      throw new Error(`Failed to generate TypeScript types from spec: ${(e as Error).message}`, { cause: e });
    }
    tree.write(joinPathFragments(outputDir, 'schema.d.ts'), schemaDts);

    // 3. Dereference for endpoint extraction (may produce circular objects —
    //    that's fine because we only iterate over it, never serialize it).
    let api: OpenAPIV3.Document;
    try {
      api = (await SwaggerParser.dereference(tmpClean)) as OpenAPIV3.Document;
    } catch (e) {
      throw new Error(`Failed to resolve $ref chains in spec: ${(e as Error).message}`, { cause: e });
    }

    // 4. Emit api-base-url.token.ts from the EJS template in files/
    generateFiles(tree, path.join(__dirname, 'files'), outputDir, {
      baseUrlToken,
      tmpl: '',
    });
    writtenFiles.add(joinPathFragments(outputDir, 'api-base-url.token.ts'));

    // 5. Parse security schemes and build EndpointModels
    const securitySchemes = parseSecuritySchemes(api);
    const schemesByName = new Map<string, SecuritySchemeModel>(
      securitySchemes.map((s) => [s.schemeName, s])
    );

    for (const scheme of securitySchemes) {
      const filePath = joinPathFragments(outputDir, `${scheme.fileName}.ts`);
      tree.write(filePath, renderSecurityTokenFile(scheme, baseUrlToken));
      writtenFiles.add(filePath);
    }

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
        const filePath = joinPathFragments(tagDir, `${ep.fileName}.token.ts`);
        tree.write(filePath, renderTokenFile(ep, baseUrlToken, providedIn, schemesByName));
        writtenFiles.add(filePath);

        if (includeMocks) {
          const mockPath = joinPathFragments(tagDir, `${ep.fileName}.mock.ts`);
          tree.write(mockPath, renderMockFile(ep, specId));
          writtenFiles.add(mockPath);
        }
      }

      const tagBarrel =
        tagEndpoints
          .map((ep) => `export * from './${ep.fileName}.token';`)
          .join('\n') + '\n';
      tree.write(joinPathFragments(tagDir, 'index.ts'), tagBarrel);

      if (includeMocks) {
        const mockBarrelPath = joinPathFragments(tagDir, 'index.mock.ts');
        const mockBarrel =
          tagEndpoints
            .map((ep) => `export * from './${ep.fileName}.mock';`)
            .join('\n') + '\n';
        tree.write(mockBarrelPath, mockBarrel);
        writtenFiles.add(mockBarrelPath);
      }
    }

    // 8. Root barrel index
    const rootBarrel =
      `export * from './api-base-url.token';\n` +
      securitySchemes.map((s) => `export * from './${s.fileName}';\n`).join('') +
      [...byTag.keys()].map((tag) => `export * from './${tag}';\n`).join('');
    tree.write(joinPathFragments(outputDir, 'index.ts'), rootBarrel);

    if (includeMocks) {
      const rootMockBarrel =
        [...byTag.keys()].map((tag) => `export * from './${tag}/index.mock';\n`).join('');
      tree.write(joinPathFragments(outputDir, 'index.mock.ts'), rootMockBarrel);
      writtenFiles.add(joinPathFragments(outputDir, 'index.mock.ts'));
      addMockPathAlias(tree, outputDir);

      const manifestMocks = endpoints.map((ep) => ({
        tokenName: ep.tokenName,
        operationId: ep.operationId,
        path: ep.apiPath,
        method: ep.method,
        ...(ep.tag !== 'default' ? { tag: ep.tag } : {}),
      }));
      const manifestPath = joinPathFragments(outputDir, 'mocks.manifest.json');
      tree.write(
        manifestPath,
        JSON.stringify({ specId, mocks: manifestMocks }, null, 2) + '\n',
      );
      writtenFiles.add(manifestPath);
    }

    // 9. Delete stale token/security files from previous runs that this run
    //    no longer produces (e.g. removed endpoints, changed tagFilter).
    for (const stale of preExistingFiles) {
      if (!writtenFiles.has(stale)) {
        tree.delete(stale);
      }
    }
  } finally {
    try {
      fs.unlinkSync(tmpClean);
    } catch {
      /* ignore */
    }
    if (tmpDownload) {
      try {
        fs.unlinkSync(tmpDownload);
      } catch {
        /* ignore */
      }
    }
  }

  await formatFiles(tree);
}

export default apiResourceGenerator;
