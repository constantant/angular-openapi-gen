import type { EndpointModel, SecuritySchemeModel, WebhookModel } from './endpoint-model';

export function toPascalCase(str: string): string {
  return str
    .replace(/\//g, '-')
    .split(/[-_.\s]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

export function toCamelCase(str: string): string {
  const parts = str.split(/[-_.]+/).filter(Boolean);
  const first = parts[0].charAt(0).toLowerCase() + parts[0].slice(1);
  return first + parts.slice(1).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function headerEntryForScheme(s: SecuritySchemeModel, varName: string): string {
  const val = `${varName}()`;
  switch (s.kind) {
    case 'bearer':
    case 'oauth2':
    case 'openIdConnect':
      return `{ Authorization: \`Bearer \${${val}}\` }`;
    case 'basic':
      return `{ Authorization: \`Basic \${${val}}\` }`;
    case 'apiKey-header':
      return `{ ${JSON.stringify(s.apiKeyParamName ?? 'X-Api-Key')}: \`\${${val}}\` }`;
    default:
      return '{}';
  }
}

function apiPrefixFromBaseToken(baseUrlToken: string): string {
  const stripped = baseUrlToken.replace(/_BASE_URL$/i, '');
  return toCamelCase(stripped.toLowerCase().replace(/_/g, '-'));
}

export function renderSecurityTokenFile(
  scheme: SecuritySchemeModel,
  baseUrlToken: string
): string {
  if (scheme.kind === 'digest') {
    const interceptorName =
      apiPrefixFromBaseToken(baseUrlToken) + toPascalCase(scheme.schemeName) + 'Interceptor';
    return [
      `import { InjectionToken, inject } from '@angular/core';`,
      `import { HttpInterceptorFn } from '@angular/common/http';`,
      `import { ${baseUrlToken} } from './api-base-url.token';`,
      ``,
      `export const ${scheme.tokenName} = new InjectionToken<HttpInterceptorFn>('${scheme.tokenName}');`,
      ``,
      `export const ${interceptorName}: HttpInterceptorFn = (req, next) => {`,
      `  const base = inject(${baseUrlToken});`,
      `  if (!req.url.startsWith(base)) return next(req);`,
      `  const fn = inject(${scheme.tokenName}, { optional: true });`,
      `  if (!fn) return next(req);`,
      `  return fn(req, next);`,
      `};`,
      ``,
    ].join('\n');
  }

  return [
    `import { InjectionToken, Signal } from '@angular/core';`,
    ``,
    `export const ${scheme.tokenName} = new InjectionToken<Signal<string | null>>('${scheme.tokenName}');`,
    ``,
  ].join('\n');
}

export function renderWebhookTokenFile(wh: WebhookModel): string {
  const pascal = toPascalCase(wh.name);
  const hasPayload = wh.payloadContentType !== null;
  const hasResponse = wh.responseStatuses.length > 0;
  const needsWebhooksType = hasPayload || hasResponse;

  const lines: string[] = [];
  lines.push(`import { InjectionToken } from '@angular/core';`);
  lines.push(`import { HttpInterceptorFn } from '@angular/common/http';`);
  if (needsWebhooksType) {
    lines.push(`import type { webhooks } from './schema.d';`);
  }
  lines.push('');

  if (hasPayload) {
    lines.push(
      `export type ${pascal}WebhookPayload =`,
      `  NonNullable<webhooks[${JSON.stringify(wh.name)}][${JSON.stringify(wh.method)}]['requestBody']>['content'][${JSON.stringify(wh.payloadContentType)}];`,
      ''
    );
  }

  if (hasResponse) {
    if (wh.responseStatuses.length === 1) {
      lines.push(
        `export type ${pascal}WebhookResponse =`,
        `  webhooks[${JSON.stringify(wh.name)}][${JSON.stringify(wh.method)}]['responses'][${JSON.stringify(wh.responseStatuses[0])}]['content']['application/json'];`,
        ''
      );
    } else {
      lines.push(`export type ${pascal}WebhookResponse =`);
      for (const code of wh.responseStatuses) {
        lines.push(
          `  | webhooks[${JSON.stringify(wh.name)}][${JSON.stringify(wh.method)}]['responses'][${JSON.stringify(code)}]['content']['application/json']`
        );
      }
      lines.push('');
    }
  }

  if (wh.deprecated) {
    lines.push('/** @deprecated */');
  }
  lines.push(
    `export const ${wh.tokenName} = new InjectionToken<HttpInterceptorFn>('${wh.tokenName}');`,
    ''
  );

  return lines.join('\n');
}

export type ClientType = 'httpResource' | 'httpClient';

export interface RenderTokenOptions {
  providedIn?: 'root' | 'none';
  schemesByName?: Map<string, SecuritySchemeModel>;
  dateType?: 'string' | 'Date' | 'Temporal';
  readonlyResponses?: boolean;
  /**
   * The schema was generated with openapi-typescript's `readWriteMarkers`: request bodies are
   * wrapped in `Writable<>` (drops `readOnly` properties) and response / error types in
   * `Readable<>` (drops `writeOnly` ones).
   */
  readWriteMarkers?: boolean;
  validateResponses?: boolean;
  /** Which Angular HTTP primitive the token's factory wraps. Default: httpResource. */
  client?: ClientType;
  /**
   * Report transfer progress. For `httpClient` endpoints that upload a binary / multipart body or
   * download a blob, the token yields `Observable<HttpEvent<T>>` (upload/download progress +
   * response). For `httpResource` it emits `reportProgress: true` on blob downloads only, because
   * `httpResource().progress()` carries download progress but ignores upload progress.
   */
  reportProgress?: boolean;
  /**
   * Accept a trailing `options` argument (HttpContext, headers, withCredentials and, for
   * httpResource, defaultValue / equal / injector / debugName). Needs the lib-level
   * `request-options.ts` that the generator emits alongside.
   */
  callOptions?: boolean;
  /**
   * Hand every `httpResource` the token creates to the lib-level `mock-hook.ts`, so a mocking
   * tool can re-run live resources when a mock is edited.
   */
  mockHooks?: boolean;
}

/** Endpoints where transfer progress is meaningful: binary/multipart uploads and blob downloads. */
function transfersFiles(ep: EndpointModel): boolean {
  const uploads =
    ep.hasBody && (ep.isBinaryBody || (ep.bodyContentType?.startsWith('multipart/') ?? false));
  return uploads || ep.responseVariant === 'blob';
}

/** True when the token for `ep` yields `Observable<HttpEvent<T>>` rather than `Observable<T>`. */
export function yieldsHttpEvents(ep: EndpointModel, client: ClientType, reportProgress: boolean): boolean {
  return reportProgress && client === 'httpClient' && transfersFiles(ep);
}

/** True when the endpoint's query params go through the shared `dropUndefined` helper. */
export function usesDropUndefined(ep: EndpointModel): boolean {
  return !ep.navigation && ep.hasQueryParams && ep.specialQueryParams.length === 0;
}

/**
 * Keeps only the `schema.d` type imports the file uses, and drops the import when none is left: an
 * operation without params, body or JSON response types (a text endpoint, a bodiless 204) would
 * otherwise import `paths` for nothing, which fails `noUnusedLocals`.
 */
export function pruneSchemaImports(code: string): string {
  return code.replace(/^import type \{ ([^}]+) \} from '\.\.\/schema\.d';\n/m, (line, names: string, offset: number) => {
    const rest = code.slice(0, offset) + code.slice(offset + line.length);
    const used = names
      .split(',')
      .map((n) => n.trim())
      .filter((n) => new RegExp(`\\b${n}\\b`).test(rest));
    return used.length > 0 ? `import type { ${used.join(', ')} } from '../schema.d';\n` : '';
  });
}

export function renderTokenFile(ep: EndpointModel, baseUrlToken: string, options: RenderTokenOptions = {}): string {
  return pruneSchemaImports(renderTokenFileUnpruned(ep, baseUrlToken, options));
}

function renderTokenFileUnpruned(
  ep: EndpointModel,
  baseUrlToken: string,
  {
    providedIn = 'none',
    schemesByName = new Map(),
    dateType = 'string',
    readonlyResponses = false,
    readWriteMarkers = false,
    validateResponses = false,
    client = 'httpResource',
    reportProgress = false,
    callOptions = false,
    mockHooks = false,
  }: RenderTokenOptions = {}
): string {
  const useHttpClient = client === 'httpClient';
  const httpEvents = yieldsHttpEvents(ep, client, reportProgress);
  // httpResource().progress() only carries *download* progress, so only blob downloads get the flag.
  const withProgress = reportProgress && !useHttpClient && ep.responseVariant === 'blob';
  const pascal = toPascalCase(ep.operationId);
  // Path values are user data: '#', '?', '/' or '%' in them would otherwise change the URL's meaning.
  const urlTemplate = ep.apiPath.replace(/\{([\w-]+)\}/g, (_, p) => `\${encodeURIComponent(${toCamelCase(p)})}`);
  const isGet = ep.method === 'get';
  const { responseStatuses, responseVariant } = ep;
  const hasJsonResponse = responseStatuses.length > 0;
  const hasResponse = hasJsonResponse || responseVariant !== 'json';
  const canValidate =
    validateResponses && responseVariant === 'json' && hasResponse && ep.responseSchema != null;

  const applicableSchemes = ep.securitySchemeNames
    .map((name) => schemesByName.get(name))
    .filter((s): s is SecuritySchemeModel => s !== undefined && s.kind !== 'digest');
  const headerSchemes = applicableSchemes.filter((s) => s.kind !== 'apiKey-query');
  const querySchemes = applicableSchemes.filter((s) => s.kind === 'apiKey-query');

  const lines: string[] = [];

  // Imports
  const coreImports = ['InjectionToken', 'inject'];
  if (!useHttpClient && !isGet && ep.hasBody) coreImports.push('Signal');
  if (providedIn === 'none') coreImports.push('FactoryProvider');
  lines.push(`import { ${coreImports.join(', ')} } from '@angular/core';`);
  if (useHttpClient) {
    if (httpEvents) {
      lines.push(
        canValidate
          ? `import { HttpClient, HttpEventType, type HttpEvent } from '@angular/common/http';`
          : `import { HttpClient, type HttpEvent } from '@angular/common/http';`,
      );
    } else {
      lines.push(`import { HttpClient } from '@angular/common/http';`);
    }
    lines.push(canValidate ? `import { map, type Observable } from 'rxjs';` : `import type { Observable } from 'rxjs';`);
  } else {
    lines.push(`import { httpResource } from '@angular/common/http';`);
  }
  if (canValidate) {
    lines.push(`import { Validator, type Schema } from '@cfworker/json-schema';`);
  }
  const needsComponents = ep.discriminator?.variants.some((v) => v.schemaName) ?? false;
  // Only import the read/write helpers a file actually uses (an unused type import fails lint).
  const usesWritable = readWriteMarkers && !isGet && ep.hasBody && !!ep.bodyContentType && !ep.isBinaryBody;
  const usesReadable =
    readWriteMarkers && ((hasResponse && responseVariant === 'json') || ep.errorStatuses.length > 0 || needsComponents);
  const schemaImports = [
    'paths',
    ...(needsComponents ? ['components'] : []),
    ...(usesReadable ? ['Readable'] : []),
    ...(usesWritable ? ['Writable'] : []),
  ];
  lines.push(`import type { ${schemaImports.join(', ')} } from '../schema.d';`);
  if (callOptions) {
    lines.push(
      useHttpClient
        ? `import { splitCallOptions, type CallOptions } from '../request-options';`
        : `import { splitCallOptions, type ResourceCallOptions, type ResourceRefFor } from '../request-options';`,
    );
  }
  lines.push(`import { ${baseUrlToken} } from '../api-base-url.token';`);
  if (mockHooks && !useHttpClient) lines.push(`import { trackResource } from '../mock-hook';`);
  if (usesDropUndefined(ep)) lines.push(`import { dropUndefined } from '../query-params';`);
  for (const scheme of applicableSchemes) {
    lines.push(`import { ${scheme.tokenName} } from '../${scheme.fileName}';`);
  }
  lines.push('');

  // Exported type aliases sourced directly from the generated paths type.
  if (ep.hasQueryParams) {
    lines.push(
      `export type ${pascal}Params =`,
      `  paths['${ep.apiPath}']['${ep.method}']['parameters']['query'];`,
      ''
    );
  }

  // Enum label / description maps from x-enum-varnames / x-enum-descriptions vendor extensions.
  for (const ext of ep.enumExtensions) {
    const mapPrefix = `${toCamelCase(ep.operationId)}${toPascalCase(ext.paramName)}`;
    if (ext.varnames) {
      lines.push(`export const ${mapPrefix}Labels = {`);
      for (let i = 0; i < ext.values.length; i++) {
        lines.push(`  ${JSON.stringify(ext.values[i])}: ${JSON.stringify(ext.varnames[i] ?? ext.values[i])},`);
      }
      lines.push(`} as const;`, '');
    }
    if (ext.descriptions) {
      lines.push(`export const ${mapPrefix}Descriptions = {`);
      for (let i = 0; i < ext.values.length; i++) {
        lines.push(`  ${JSON.stringify(ext.values[i])}: ${JSON.stringify(ext.descriptions[i] ?? '')},`);
      }
      lines.push(`} as const;`, '');
    }
  }
  if (!isGet && ep.hasBody && ep.bodyContentType) {
    if (ep.isBinaryBody) {
      // Binary content (octet-stream, pdf, image/*…): use Blob | ArrayBuffer directly.
      // openapi-typescript types binary schemas as string | Blob which isn't useful here.
      lines.push(`export type ${pascal}Body = Blob | ArrayBuffer;`, '');
    } else {
      const body = `NonNullable<paths['${ep.apiPath}']['${ep.method}']['requestBody']>['content']['${ep.bodyContentType}']`;
      lines.push(`export type ${pascal}Body =`, `  ${usesWritable ? `Writable<${body}>` : body};`, '');
    }
  }
  // Response / error types: `Readable<>` first (drop writeOnly), then `Readonly<>` on request.
  const ro = (expr: string) => {
    const readable = readWriteMarkers ? `Readable<${expr}>` : expr;
    return readonlyResponses ? `Readonly<${readable}>` : readable;
  };

  if (hasResponse) {
    if (responseVariant === 'text') {
      lines.push(`export type ${pascal}Response = string;`, '');
    } else if (responseVariant === 'blob') {
      lines.push(`export type ${pascal}Response = Blob;`, '');
    } else if (responseStatuses.length === 1) {
      lines.push(
        `export type ${pascal}Response =`,
        `  ${ro(`paths['${ep.apiPath}']['${ep.method}']['responses']['${responseStatuses[0]}']['content']['application/json']`)};`,
        ''
      );
    } else {
      // Union across all 2xx JSON response codes.
      lines.push(`export type ${pascal}Response =`);
      for (const code of responseStatuses) {
        lines.push(
          `  | ${ro(`paths['${ep.apiPath}']['${ep.method}']['responses']['${code}']['content']['application/json']`)}`
        );
      }
      lines.push('');
    }
  }
  if (ep.errorStatuses.length > 0) {
    if (ep.errorStatuses.length === 1) {
      lines.push(
        `export type ${pascal}Error =`,
        `  ${ro(`paths['${ep.apiPath}']['${ep.method}']['responses']['${ep.errorStatuses[0]}']['content']['application/json']`)};`,
        ''
      );
    } else {
      lines.push(`export type ${pascal}Error =`);
      for (const code of ep.errorStatuses) {
        lines.push(
          `  | ${ro(`paths['${ep.apiPath}']['${ep.method}']['responses']['${code}']['content']['application/json']`)}`
        );
      }
      lines.push('');
    }
    // The same bodies keyed by status, so a mocked or asserted error can be typed by its status.
    lines.push(`export type ${pascal}Errors = {`);
    for (const code of ep.errorStatuses) {
      lines.push(
        `  '${code}': ${ro(`paths['${ep.apiPath}']['${ep.method}']['responses']['${code}']['content']['application/json']`)};`
      );
    }
    lines.push('};', '');
  }

  // Discriminated union helpers — emitted when the primary response schema has a discriminator.
  if (ep.discriminator && hasResponse) {
    const { propertyName, variants, isArrayResponse } = ep.discriminator;
    const keyLiterals = variants.map((v) => JSON.stringify(v.key)).join(' | ');
    lines.push(`export type ${pascal}DiscriminatorKey = ${keyLiterals};`, '');

    for (const v of variants) {
      const variantPascal = toPascalCase(v.key);
      let typeExpr: string;
      if (v.schemaName) {
        // Mapping-based: intersect component schema with a literal discriminant tag.
        const schema = `components['schemas'][${JSON.stringify(v.schemaName)}]`;
        typeExpr = `${readWriteMarkers ? `Readable<${schema}>` : schema} & { ${JSON.stringify(propertyName)}: ${JSON.stringify(v.key)} }`;
      } else {
        // Enum-based fallback: narrow the response union with Extract.
        const base = isArrayResponse
          ? `${pascal}Response extends (infer _I)[] ? _I : never`
          : `${pascal}Response`;
        typeExpr = `Extract<${base}, { ${JSON.stringify(propertyName)}: ${JSON.stringify(v.key)} }>`;
      }
      lines.push(`export type ${pascal}${variantPascal} = ${typeExpr};`, '');
    }

    const variantNames = variants.map((v) => `${pascal}${toPascalCase(v.key)}`).join(' | ');
    const discriminatedExpr = isArrayResponse ? `(${variantNames})[]` : variantNames;
    lines.push(`export type ${pascal}Discriminated = ${discriminatedExpr};`, '');
  }

  // Date/datetime reviver — emitted when dateType != 'string' and the response has date fields.
  if (dateType !== 'string' && ep.dateFields.length > 0 && hasResponse) {
    const omitKeys = ep.dateFields.map((f) => JSON.stringify(f.name)).join(' | ');
    if (ep.responseIsArray) {
      lines.push(`export type ${pascal}Revived = (Omit<`);
      lines.push(`  ${pascal}Response extends (infer _I)[] ? _I : never,`);
      lines.push(`  ${omitKeys}`);
      lines.push(`> & {`);
      for (const f of ep.dateFields) {
        const tsType = dateType === 'Temporal'
          ? f.format === 'date-time' ? 'Temporal.Instant' : 'Temporal.PlainDate'
          : 'Date';
        lines.push(`  ${f.name}: ${tsType};`);
      }
      lines.push(`})[];`);
      lines.push('');
      lines.push(`export function revive${pascal}Dates(raw: ${pascal}Response): ${pascal}Revived {`);
      lines.push(`  return (raw as unknown[]).map((item) => {`);
      lines.push(`    const obj = item as Record<string, unknown>;`);
      lines.push(`    return {`);
      lines.push(`      ...obj,`);
      for (const f of ep.dateFields) {
        const convert = dateType === 'Temporal'
          ? f.format === 'date-time'
            ? `Temporal.Instant.from(obj[${JSON.stringify(f.name)}] as string)`
            : `Temporal.PlainDate.from(obj[${JSON.stringify(f.name)}] as string)`
          : `new Date(obj[${JSON.stringify(f.name)}] as string)`;
        lines.push(`      ${f.name}: obj[${JSON.stringify(f.name)}] != null ? ${convert} : obj[${JSON.stringify(f.name)}],`);
      }
      lines.push(`    };`);
      lines.push(`  }) as ${pascal}Revived;`);
      lines.push(`}`);
      lines.push('');
    } else {
      lines.push(`export type ${pascal}Revived = Omit<${pascal}Response, ${omitKeys}> & {`);
      for (const f of ep.dateFields) {
        const tsType = dateType === 'Temporal'
          ? f.format === 'date-time' ? 'Temporal.Instant' : 'Temporal.PlainDate'
          : 'Date';
        lines.push(`  ${f.name}: ${tsType};`);
      }
      lines.push(`};`);
      lines.push('');
      lines.push(`export function revive${pascal}Dates(raw: ${pascal}Response): ${pascal}Revived {`);
      lines.push(`  const obj = raw as unknown as Record<string, unknown>;`);
      lines.push(`  return {`);
      lines.push(`    ...obj,`);
      for (const f of ep.dateFields) {
        const convert = dateType === 'Temporal'
          ? f.format === 'date-time'
            ? `Temporal.Instant.from(obj[${JSON.stringify(f.name)}] as string)`
            : `Temporal.PlainDate.from(obj[${JSON.stringify(f.name)}] as string)`
          : `new Date(obj[${JSON.stringify(f.name)}] as string)`;
        lines.push(`    ${f.name}: obj[${JSON.stringify(f.name)}] != null ? ${convert} : obj[${JSON.stringify(f.name)}],`);
      }
      lines.push(`  } as ${pascal}Revived;`);
      lines.push(`}`);
      lines.push('');
    }
  }

  // Runtime response validation — emitted when --validateResponses is set and the
  // dereferenced response schema could be serialized (no circular $ref).
  if (canValidate) {
    lines.push(`const _responseSchema: Schema = ${JSON.stringify(ep.responseSchema, null, 2)};`, '');
    lines.push(`function _validateResponse(value: unknown): ${pascal}Response {`);
    lines.push(`  const _result = new Validator(_responseSchema).validate(value);`);
    lines.push(`  if (!_result.valid) {`);
    lines.push(
      `    throw new Error(\`${pascal} response failed schema validation: \${JSON.stringify(_result.errors)}\`);`
    );
    lines.push(`  }`);
    lines.push(`  return value as ${pascal}Response;`);
    lines.push(`}`, '');
  }

  const responseT = hasResponse ? `${pascal}Response` : ep.noContent ? 'void' : 'unknown';
  // Token generic and call site differ by responseVariant.
  // json  → InjectionToken<(...) => ReturnType<typeof httpResource<T>>>
  // text  → InjectionToken<(...) => ReturnType<typeof httpResource.text>>
  // blob  → InjectionToken<(...) => ReturnType<typeof httpResource.blob>>
  const resourceReturnType =
    responseVariant === 'text' ? `ReturnType<typeof httpResource.text>` :
    responseVariant === 'blob' ? `ReturnType<typeof httpResource.blob>` :
    `ReturnType<typeof httpResource<${responseT}>>`;
  const resourceCall =
    responseVariant === 'text' ? 'httpResource.text' :
    responseVariant === 'blob' ? 'httpResource.blob' :
    `httpResource<${responseT}>`;
  // With mock hooks the created resource is passed through `trackResource('KEY', …)`.
  const resourceOpen = mockHooks ? `trackResource('${ep.tokenName}', ${resourceCall}` : resourceCall;
  const resourceClose = mockHooks ? ')' : '';
  const fnArgs = buildFnArgs(ep, pascal, isGet);

  // Emit a params serializer when the spec uses non-default query param styles.
  const hasSpecialParams = ep.specialQueryParams.length > 0 && ep.hasQueryParams;
  if (hasSpecialParams) {
    lines.push(`function _serializeParams(p: ${pascal}Params | undefined): Record<string, string | readonly string[]> | undefined {`);
    lines.push(`  if (p == null) return undefined;`);
    lines.push(`  const _out: Record<string, string | readonly string[]> = {};`);
    lines.push(`  for (const [_k, _v] of Object.entries(p as Record<string, unknown>)) {`);
    lines.push(`    if (_v == null) continue;`);
    lines.push(`    switch (_k) {`);
    for (const sp of ep.specialQueryParams) {
      lines.push(`      case ${JSON.stringify(sp.name)}:`);
      if (sp.serializer === 'deepObject') {
        lines.push(`        for (const [_dk, _dv] of Object.entries(_v as Record<string, unknown>))`);
        lines.push(`          if (_dv != null) _out['${sp.name}[' + _dk + ']'] = String(_dv);`);
      } else {
        const sep = sp.serializer === 'pipes' ? '|' : sp.serializer === 'spaces' ? ' ' : ',';
        lines.push(`        _out[${JSON.stringify(sp.name)}] = Array.isArray(_v) ? (_v as unknown[]).join(${JSON.stringify(sep)}) : String(_v);`);
      }
      lines.push(`        break;`);
    }
    lines.push(`      default:`);
    lines.push(`        _out[_k] = Array.isArray(_v) ? (_v as unknown[]).map(String) : String(_v as string | number | boolean);`);
    lines.push(`    }`);
    lines.push(`  }`);
    lines.push(`  return _out;`);
    lines.push(`}`);
    lines.push('');
  }

  if (useHttpClient) {
    emitHttpClientToken(lines, ep, {
      pascal, urlTemplate, baseUrlToken, providedIn, applicableSchemes,
      headerSchemes, querySchemes, canValidate, responseT, isGet, httpEvents, callOptions,
    });
    return lines.join('\n');
  }

  if (callOptions) {
    emitResourceTokenWithCallOptions(lines, ep, {
      pascal, urlTemplate, baseUrlToken, providedIn, applicableSchemes, headerSchemes, querySchemes,
      canValidate, resourceCall: resourceOpen, resourceClose, isGet, withProgress,
      valueT: responseVariant === 'text' ? 'string' : responseVariant === 'blob' ? 'Blob' : responseT,
    });
    return lines.join('\n');
  }

  if (ep.deprecated) {
    lines.push('/** @deprecated */');
  }
  lines.push(
    `export const ${ep.tokenName} = new InjectionToken<`,
    `  (${fnArgs}) => ${resourceReturnType}`,
    `>('${ep.tokenName}'${providedIn === 'root' ? `, {` : ')'}`,
  );

  const securityInjects = (indent: string) =>
    applicableSchemes
      .map(
        (s) =>
          `${indent}const ${toCamelCase(s.schemeName)} = inject(${s.tokenName}, { optional: true });`
      )
      .join('\n');

  // httpResource mutations accept `body: T | Signal<T>`. The signal has to be read *inside* the
  // reactive lambda — passing it through would send the signal function itself as the body and
  // never re-fire when it changes — so a block body unwraps it, like `params` below.
  const signalBody = !isGet && ep.hasBody;
  const needsBlockBody = ep.hasQueryParams || signalBody;
  const blockPrelude = (ind: string): string[] => [
    ...(ep.hasQueryParams
      ? [
          `${ind}const _params = typeof params === 'function' ? params() : params;`,
          `${ind}if (typeof params === 'function' && _params === undefined) return undefined;`,
        ]
      : []),
    ...(signalBody
      ? [`${ind}const _body = typeof body === 'function' ? (body as Signal<${pascal}Body>)() : body;`]
      : []),
  ];
  const parseOption = canValidate ? ', { parse: _validateResponse }' : '';

  if (providedIn === 'root') {
    lines.push(
      `  providedIn: 'root',`,
      `  factory: () => {`,
      `    const base = inject(${baseUrlToken});`,
    );
    if (applicableSchemes.length > 0) lines.push(securityInjects('    '));
    if (needsBlockBody) {
      lines.push(
        `    return (${fnArgs}) =>`,
        `      ${resourceOpen}(() => {`,
        ...blockPrelude('        '),
        `        return {`,
        `          url: \`\${base}${urlTemplate}\`,`,
      );
      appendResourceOptions(lines, ep, isGet, '          ', headerSchemes, querySchemes, true, false, withProgress);
      lines.push(`        };`, `      }${parseOption})${resourceClose};`, `  },`, `});`, '');
    } else {
      lines.push(
        `    return (${fnArgs}) =>`,
        `      ${resourceOpen}(() => ({`,
        `        url: \`\${base}${urlTemplate}\`,`,
      );
      appendResourceOptions(lines, ep, isGet, '        ', headerSchemes, querySchemes, false, false, withProgress);
      lines.push(`      })${parseOption})${resourceClose};`, `  },`, `});`, '');
    }
  } else {
    lines.push('');
    lines.push(
      `export function provide${pascal}(): FactoryProvider {`,
      `  return {`,
      `    provide: ${ep.tokenName},`,
      `    useFactory: () => {`,
      `      const base = inject(${baseUrlToken});`,
    );
    if (applicableSchemes.length > 0) lines.push(securityInjects('      '));
    if (needsBlockBody) {
      lines.push(
        `      return (${fnArgs}) =>`,
        `        ${resourceOpen}(() => {`,
        ...blockPrelude('          '),
        `          return {`,
        `            url: \`\${base}${urlTemplate}\`,`,
      );
      appendResourceOptions(lines, ep, isGet, '            ', headerSchemes, querySchemes, true, false, withProgress);
      lines.push(`          };`, `        }${parseOption})${resourceClose};`, `    },`, `  };`, `}`, '');
    } else {
      lines.push(
        `      return (${fnArgs}) =>`,
        `        ${resourceOpen}(() => ({`,
        `          url: \`\${base}${urlTemplate}\`,`,
      );
      appendResourceOptions(lines, ep, isGet, '          ', headerSchemes, querySchemes, false, false, withProgress);
      lines.push(`        })${parseOption})${resourceClose};`, `    },`, `  };`, `}`, '');
    }
  }

  return lines.join('\n');
}

/**
 * Condition (a TS expression over the injected auth signals) under which `scheme` is applied. Each
 * security requirement of the spec is an alternative whose schemes are required together, and the
 * first alternative with every token provided wins - schemes of the others stay unused.
 */
function schemeAppliesWhen(ep: EndpointModel, usable: Set<string>, scheme: SecuritySchemeModel): string {
  const alternatives = ep.securityAlternatives.map((alt) => alt.filter((n) => usable.has(n)));
  const provided = (alt: string[]) => (alt.length ? alt.map((n) => `${toCamelCase(n)}?.() != null`).join(' && ') : 'true');
  const branches: string[] = [];
  for (let k = 0; k < alternatives.length; k++) {
    if (!alternatives[k].includes(scheme.schemeName)) continue;
    // An earlier alternative that is a subset of this one (or needs no token) is provided whenever this
    // one is, so this one never wins.
    if (alternatives.slice(0, k).some((prev) => prev.every((n) => alternatives[k].includes(n)))) continue;
    const earlier = alternatives.slice(0, k).map(provided);
    branches.push([provided(alternatives[k]), ...earlier.map((e) => `!(${e})`)].join(' && '));
  }
  if (!branches.length) return 'false';
  return branches.length === 1 ? branches[0] : branches.map((b) => `(${b})`).join(' || ');
}

function isJsonMedia(contentType: string | null): boolean {
  return contentType !== null && /^application\/([\w.-]+\+)?json(;|$)/i.test(contentType);
}

function appendResourceOptions(
  lines: string[],
  ep: EndpointModel,
  isGet: boolean,
  indent: string,
  headerSchemes: SecuritySchemeModel[],
  querySchemes: SecuritySchemeModel[],
  usePrecomputedParams = false,
  useHttpClient = false,
  withProgress = false,
  callOptions = false,
): void {
  // HttpClient.request() takes the method positionally; httpResource takes it in the config.
  if (!isGet && !useHttpClient) {
    lines.push(`${indent}method: '${ep.method.toUpperCase()}',`);
  }
  if (useHttpClient && ep.responseVariant !== 'json') {
    lines.push(`${indent}responseType: '${ep.responseVariant}',`);
  }
  if (withProgress) {
    lines.push(`${indent}reportProgress: true,`);
  }

  const usableSchemes = new Set([...headerSchemes, ...querySchemes].map((s) => s.schemeName));
  const hasRegularParams = ep.hasQueryParams;
  const hasAuthQueryParams = querySchemes.length > 0;
  const hasSpecialParams = ep.specialQueryParams.length > 0 && hasRegularParams;

  if (hasRegularParams || hasAuthQueryParams) {
    const authQueryParts = querySchemes
      .map(
        (s) =>
          `...(${schemeAppliesWhen(ep, usableSchemes, s)} ? { ${JSON.stringify(s.apiKeyParamName ?? s.schemeName)}: \`\${${toCamelCase(s.schemeName)}()}\` } : {})`
      )
      .join(', ');
    // Optional params the caller leaves `undefined` must not reach the wire: HttpClient would
    // send `?status=undefined`. `_serializeParams` already skips null/undefined itself.
    const rawParams = useHttpClient
      ? 'params'
      : usePrecomputedParams
        ? '_params'
        : `(typeof params === 'function' ? params() : params)`;
    const paramsExpr = hasSpecialParams
      ? `_serializeParams(${useHttpClient ? 'params' : '_params'})`
      : `dropUndefined(${rawParams})`;
    const cast = ` as unknown as Record<string, string | number | boolean | readonly (string | number | boolean)[]>`;

    if (hasRegularParams && hasAuthQueryParams) {
      lines.push(`${indent}params: { ...${paramsExpr}, ${authQueryParts} }${cast},`);
    } else if (hasRegularParams) {
      lines.push(`${indent}params: ${paramsExpr}${cast},`);
    } else {
      lines.push(`${indent}params: { ${authQueryParts} }${cast},`);
    }
  }

  if (!isGet && ep.hasBody) {
    // httpResource reads the (possibly signal) body inside its reactive lambda as `_body`.
    const bodyVar = useHttpClient ? 'body' : '_body';
    // A string reaching a JSON endpoint is a JSON string value: Angular would send it unquoted.
    lines.push(
      isJsonMedia(ep.bodyContentType)
        ? `${indent}body: typeof ${bodyVar} === 'string' ? JSON.stringify(${bodyVar}) : ${bodyVar},`
        : `${indent}${useHttpClient ? 'body' : 'body: _body'},`,
    );
  }
  const jsonBody = !isGet && ep.hasBody && isJsonMedia(ep.bodyContentType);

  const hasHeaderParams = ep.headerParams.length > 0;
  const hasCookieParams = ep.cookieParams.length > 0;
  // With call options the caller's `headers` are always merged last, so the block is always emitted.
  if (headerSchemes.length > 0 || hasHeaderParams || hasCookieParams || jsonBody || callOptions) {
    lines.push(`${indent}headers: {`);
    // Without it a string body would go out as text/plain.
    if (jsonBody) lines.push(`${indent}  'Content-Type': 'application/json',`);
    // Explicit header params from the spec (e.g. X-Api-Version, Accept-Language)
    for (const h of ep.headerParams) {
      const varName = toCamelCase(h.name);
      if (h.required) {
        lines.push(`${indent}  ${JSON.stringify(h.name)}: ${varName},`);
      } else {
        lines.push(`${indent}  ...(${varName} != null ? { ${JSON.stringify(h.name)}: ${varName} } : {}),`);
      }
    }
    // Cookie params combined into a single Cookie header value.
    // Required cookies: `name=value`; optional cookies: spread into array if non-null.
    if (hasCookieParams) {
      const cookieParts = ep.cookieParams.map((c) => {
        const v = toCamelCase(c.name);
        return c.required
          ? `\`${c.name}=\${${v}}\``
          : `...(${v} != null ? [\`${c.name}=\${${v}}\`] : [])`;
      });
      lines.push(`${indent}  'Cookie': [${cookieParts.join(', ')}].join('; '),`);
    }
    // Auth scheme headers (signal-based, always optional)
    for (const s of headerSchemes) {
      const varName = toCamelCase(s.schemeName);
      lines.push(`${indent}  ...(${schemeAppliesWhen(ep, usableSchemes, s)} ? ${headerEntryForScheme(s, varName)} : {}),`);
    }
    if (callOptions) lines.push(`${indent}  ..._opts.headers,`);
    lines.push(`${indent}},`);
  }
}

/** The statements that open a block-bodied reactive lambda: params guard, then the unwrapped body. */
function blockPreludeLines(ep: EndpointModel, pascal: string, isGet: boolean, ind: string): string[] {
  return [
    ...(ep.hasQueryParams
      ? [
          `${ind}const _params = typeof params === 'function' ? params() : params;`,
          `${ind}if (typeof params === 'function' && _params === undefined) return undefined;`,
        ]
      : []),
    ...(!isGet && ep.hasBody
      ? [`${ind}const _body = typeof body === 'function' ? (body as Signal<${pascal}Body>)() : body;`]
      : []),
  ];
}

interface ResourceCallOptionsCtx {
  pascal: string;
  urlTemplate: string;
  baseUrlToken: string;
  providedIn: 'root' | 'none';
  applicableSchemes: SecuritySchemeModel[];
  headerSchemes: SecuritySchemeModel[];
  querySchemes: SecuritySchemeModel[];
  canValidate: boolean;
  /** The resource's value type: the response alias, `string`, `Blob`, `void` or `unknown`. */
  valueT: string;
  /** The call expression up to its argument list; may open a `trackResource(` wrapper… */
  resourceCall: string;
  /** …which this closes (empty without mock hooks). */
  resourceClose: string;
  isGet: boolean;
  withProgress: boolean;
}

/**
 * Emits the token + provider for an `httpResource` token generated with `callOptions`: a generic
 * function type (so a `defaultValue` narrows the returned resource), and a factory that splits the
 * caller's options into request fields, headers and resource options per call.
 */
function emitResourceTokenWithCallOptions(lines: string[], ep: EndpointModel, ctx: ResourceCallOptionsCtx): void {
  const { pascal, urlTemplate, baseUrlToken, providedIn, applicableSchemes, valueT, resourceCall, isGet } = ctx;
  const genericArgs = buildFnArgs(ep, pascal, isGet, false, 'O');
  const implArgs = buildFnArgs(ep, pascal, isGet, false, `${pascal}Options`);
  const secondArg = ctx.canValidate
    ? ', { ..._opts.resource, parse: _validateResponse }'
    : ep.responseVariant === 'json'
      ? ', _opts.resource'
      : ', _opts.resource as never';

  lines.push(
    `export type ${pascal}Options = ResourceCallOptions<${valueT}>;`,
    '',
    `export type ${pascal}Fn = <O extends ${pascal}Options = ${pascal}Options>(`,
    `  ${genericArgs}`,
    `) => ResourceRefFor<${valueT}, O>;`,
    '',
  );
  if (ep.deprecated) lines.push('/** @deprecated */');
  lines.push(`export const ${ep.tokenName} = new InjectionToken<${pascal}Fn>('${ep.tokenName}'${providedIn === 'root' ? ', {' : ');'}`);

  const b = providedIn === 'root' ? '    ' : '      ';
  const body: string[] = [`${b}const base = inject(${baseUrlToken});`];
  for (const sch of applicableSchemes) {
    body.push(`${b}const ${toCamelCase(sch.schemeName)} = inject(${sch.tokenName}, { optional: true });`);
  }
  body.push(
    `${b}return ((${implArgs}) => {`,
    `${b}  const _opts = splitCallOptions<${valueT}>(options);`,
    `${b}  return ${resourceCall}(() => {`,
    ...blockPreludeLines(ep, pascal, isGet, `${b}    `),
    `${b}    return {`,
    // spread first: everything the spec controls (url, method, body, params) is set after it and wins
    `${b}      ..._opts.request,`,
    `${b}      url: \`\${base}${urlTemplate}\`,`,
  );
  appendResourceOptions(body, ep, isGet, `${b}      `, ctx.headerSchemes, ctx.querySchemes, true, false, ctx.withProgress, true);
  body.push(`${b}    };`, `${b}  }${secondArg})${ctx.resourceClose};`, `${b}}) as ${pascal}Fn;`);

  if (providedIn === 'root') {
    lines.push(`  providedIn: 'root',`, `  factory: () => {`, ...body, `  },`, `});`, '');
  } else {
    lines.push(
      '',
      `export function provide${pascal}(): FactoryProvider {`,
      `  return {`,
      `    provide: ${ep.tokenName},`,
      `    useFactory: () => {`,
      ...body,
      `    },`,
      `  };`,
      `}`,
      '',
    );
  }
}

interface HttpClientTokenCtx {
  pascal: string;
  urlTemplate: string;
  baseUrlToken: string;
  providedIn: 'root' | 'none';
  applicableSchemes: SecuritySchemeModel[];
  headerSchemes: SecuritySchemeModel[];
  querySchemes: SecuritySchemeModel[];
  canValidate: boolean;
  responseT: string;
  isGet: boolean;
  /** Yield Observable<HttpEvent<T>> (progress + response) instead of Observable<T>. */
  httpEvents: boolean;
  /** Accept a trailing per-call `options` argument. */
  callOptions: boolean;
}

/**
 * Emits the token + provider for `client: 'httpClient'`. The factory returns a plain
 * function that calls `HttpClient.request()` and yields a cold `Observable<T>`; params
 * and body are plain values (no thunks / signals), and auth signals are read per call.
 */
function emitHttpClientToken(lines: string[], ep: EndpointModel, ctx: HttpClientTokenCtx): void {
  const { pascal, urlTemplate, baseUrlToken, providedIn, applicableSchemes, canValidate, responseT, isGet, httpEvents, callOptions } = ctx;
  const bodyT = ep.responseVariant === 'text' ? 'string' : ep.responseVariant === 'blob' ? 'Blob' : responseT;
  const observableT = httpEvents ? `HttpEvent<${bodyT}>` : bodyT;
  // Text/blob responses are selected via responseType, which fixes the result type, so no generic.
  const requestGeneric = ep.responseVariant === 'json' ? `<${responseT}>` : '';
  const fnArgs = buildFnArgs(ep, pascal, isGet, true, callOptions ? 'CallOptions' : undefined);
  // With events, only the final Response event carries a body to validate.
  const pipe = !canValidate
    ? ''
    : httpEvents
      ? '.pipe(map((e) => (e.type === HttpEventType.Response ? e.clone({ body: _validateResponse(e.body) }) : e)))'
      : '.pipe(map(_validateResponse))';

  if (callOptions) {
    lines.push(`export type ${pascal}Fn = (${fnArgs}) => Observable<${observableT}>;`, '');
    if (ep.deprecated) lines.push('/** @deprecated */');
    lines.push(`export const ${ep.tokenName} = new InjectionToken<${pascal}Fn>('${ep.tokenName}'${providedIn === 'root' ? ', {' : ');'}`);
  } else {
    if (ep.deprecated) lines.push('/** @deprecated */');
    lines.push(
      `export const ${ep.tokenName} = new InjectionToken<`,
      `  (${fnArgs}) => Observable<${observableT}>`,
      `>('${ep.tokenName}'${providedIn === 'root' ? `, {` : ')'}`,
    );
  }

  const i = providedIn === 'root' ? '  ' : '    ';
  const body: string[] = [
    `${i}const http = inject(HttpClient);`,
    `${i}const base = inject(${baseUrlToken});`,
  ];
  for (const s of applicableSchemes) {
    body.push(`${i}const ${toCamelCase(s.schemeName)} = inject(${s.tokenName}, { optional: true });`);
  }
  if (callOptions) {
    body.push(
      `${i}return (${fnArgs}) => {`,
      `${i}  const _opts = splitCallOptions(options);`,
      `${i}  return http.request${requestGeneric}('${ep.method.toUpperCase()}', \`\${base}${urlTemplate}\`, {`,
      // spread first: everything the spec controls is set after it and wins
      `${i}    ..._opts.request,`,
    );
  } else {
    body.push(
      `${i}return (${fnArgs}) =>`,
      `${i}  http.request${requestGeneric}('${ep.method.toUpperCase()}', \`\${base}${urlTemplate}\`, {`,
    );
  }
  if (httpEvents) {
    body.push(`${i}    observe: 'events',`, `${i}    reportProgress: true,`);
  }
  appendResourceOptions(body, ep, isGet, `${i}    `, ctx.headerSchemes, ctx.querySchemes, false, true, false, callOptions);
  body.push(`${i}  })${pipe};`);
  if (callOptions) body.push(`${i}};`);

  if (providedIn === 'root') {
    lines.push(`  providedIn: 'root',`, `  factory: () => {`, ...body, `  },`, `});`, '');
  } else {
    lines.push(
      '',
      `export function provide${pascal}(): FactoryProvider {`,
      `  return {`,
      `    provide: ${ep.tokenName},`,
      `    useFactory: () => {`,
      ...body,
      `    },`,
      `  };`,
      `}`,
      '',
    );
  }
}

interface FnArg {
  /** Parameter name, as used in the generated function. */
  name: string;
  /** The TypeScript parameter, e.g. `params?: ListPetsParams`. */
  text: string;
  required: boolean;
}

/**
 * The generated function's parameters, in order. `optionsType` adds the trailing per-call
 * `options` argument (only with `callOptions`).
 */
function buildArgList(
  ep: EndpointModel,
  pascal: string,
  isGet: boolean,
  useHttpClient = false,
  optionsType?: string,
): FnArg[] {
  // Natural order: path params, header params, cookie params, body, query params, options.
  const args: FnArg[] = ep.pathParams.map((p) => ({
    name: toCamelCase(p),
    text: `${toCamelCase(p)}: string`,
    required: true,
  }));
  for (const h of [...ep.headerParams, ...ep.cookieParams]) {
    args.push({
      name: toCamelCase(h.name),
      text: h.required ? `${toCamelCase(h.name)}: string` : `${toCamelCase(h.name)}?: string`,
      required: h.required,
    });
  }
  if (!isGet && ep.hasBody) {
    args.push({
      name: 'body',
      text: useHttpClient ? `body: ${pascal}Body` : `body: ${pascal}Body | Signal<${pascal}Body>`,
      required: true,
    });
  }
  if (ep.hasQueryParams) {
    // GET keeps its long-standing optional `params`. A mutation's query params are new surface,
    // so a spec-required one (e.g. YouTube's `part`) makes the argument required too.
    const optional = isGet || !ep.hasRequiredQueryParams;
    const q = optional ? '?' : '';
    args.push({
      name: 'params',
      text: useHttpClient
        ? `params${q}: ${pascal}Params`
        : `params${q}: ${pascal}Params | (() => ${pascal}Params | undefined)`,
      required: !optional,
    });
  }
  if (optionsType) {
    args.push({ name: 'options', text: `options?: ${optionsType}`, required: false });
  }
  // TypeScript forbids a required parameter after an optional one (e.g. an optional
  // header before a required cookie or body), so stably move required args first. A
  // signature that was already valid (required…, optional…) keeps its order unchanged.
  return [...args.filter((a) => a.required), ...args.filter((a) => !a.required)];
}

function buildFnArgs(ep: EndpointModel, pascal: string, isGet: boolean, useHttpClient = false, optionsType?: string): string {
  return buildArgList(ep, pascal, isGet, useHttpClient, optionsType)
    .map((a) => a.text)
    .join(', ');
}

/**
 * The names of the generated function's parameters, in order — embedded in a mock's
 * `MockResourceMeta` so DevTools can label each argument of a recorded request.
 */
export function fnArgNames(ep: EndpointModel, client: ClientType, callOptions: boolean): string[] {
  return buildArgList(ep, toPascalCase(ep.operationId), ep.method === 'get', client === 'httpClient', callOptions ? 'x' : undefined).map(
    (a) => a.name,
  );
}
