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

export function renderTokenFile(
  ep: EndpointModel,
  baseUrlToken: string,
  providedIn: 'root' | 'none' = 'none',
  schemesByName: Map<string, SecuritySchemeModel> = new Map(),
  dateType: 'string' | 'Date' | 'Temporal' = 'string',
  readonlyResponses = false
): string {
  const pascal = toPascalCase(ep.operationId);
  const urlTemplate = ep.apiPath.replace(/\{([\w-]+)\}/g, (_, p) => `\${${toCamelCase(p)}}`);
  const isGet = ep.method === 'get';
  const { responseStatuses, responseVariant } = ep;
  const hasJsonResponse = responseStatuses.length > 0;
  const hasResponse = hasJsonResponse || responseVariant !== 'json';

  const applicableSchemes = ep.securitySchemeNames
    .map((name) => schemesByName.get(name))
    .filter((s): s is SecuritySchemeModel => s !== undefined && s.kind !== 'digest');
  const headerSchemes = applicableSchemes.filter((s) => s.kind !== 'apiKey-query');
  const querySchemes = applicableSchemes.filter((s) => s.kind === 'apiKey-query');

  const lines: string[] = [];

  // Imports
  const coreImports = ['InjectionToken', 'inject'];
  if (!isGet && ep.hasBody) coreImports.push('Signal');
  if (providedIn === 'none') coreImports.push('FactoryProvider');
  lines.push(`import { ${coreImports.join(', ')} } from '@angular/core';`);
  lines.push(`import { httpResource } from '@angular/common/http';`);
  const needsComponents = ep.discriminator?.variants.some((v) => v.schemaName) ?? false;
  lines.push(`import type { paths${needsComponents ? ', components' : ''} } from '../schema.d';`);
  lines.push(`import { ${baseUrlToken} } from '../api-base-url.token';`);
  for (const scheme of applicableSchemes) {
    lines.push(`import { ${scheme.tokenName} } from '../${scheme.fileName}';`);
  }
  lines.push('');

  // Exported type aliases sourced directly from the generated paths type.
  if (isGet && ep.hasQueryParams) {
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
      lines.push(
        `export type ${pascal}Body =`,
        `  NonNullable<paths['${ep.apiPath}']['${ep.method}']['requestBody']>['content']['${ep.bodyContentType}'];`,
        ''
      );
    }
  }
  const ro = (expr: string) => readonlyResponses ? `Readonly<${expr}>` : expr;

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
        typeExpr = `components['schemas'][${JSON.stringify(v.schemaName)}] & { ${JSON.stringify(propertyName)}: ${JSON.stringify(v.key)} }`;
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

  const responseT = hasResponse ? `${pascal}Response` : 'unknown';
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
  const fnArgs = buildFnArgs(ep, pascal, isGet);

  // Emit a params serializer when the spec uses non-default query param styles.
  const hasSpecialParams = ep.specialQueryParams.length > 0 && isGet && ep.hasQueryParams;
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

  const needsBlockBody = isGet && ep.hasQueryParams;

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
        `      ${resourceCall}(() => {`,
        `        const _params = typeof params === 'function' ? params() : params;`,
        `        if (typeof params === 'function' && _params === undefined) return undefined;`,
        `        return {`,
        `          url: \`\${base}${urlTemplate}\`,`,
      );
      appendResourceOptions(lines, ep, isGet, '          ', headerSchemes, querySchemes, true);
      lines.push(`        };`, `      });`, `  },`, `});`, '');
    } else {
      lines.push(
        `    return (${fnArgs}) =>`,
        `      ${resourceCall}(() => ({`,
        `        url: \`\${base}${urlTemplate}\`,`,
      );
      appendResourceOptions(lines, ep, isGet, '        ', headerSchemes, querySchemes, false);
      lines.push(`      }));`, `  },`, `});`, '');
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
        `        ${resourceCall}(() => {`,
        `          const _params = typeof params === 'function' ? params() : params;`,
        `          if (typeof params === 'function' && _params === undefined) return undefined;`,
        `          return {`,
        `            url: \`\${base}${urlTemplate}\`,`,
      );
      appendResourceOptions(lines, ep, isGet, '            ', headerSchemes, querySchemes, true);
      lines.push(`          };`, `        });`, `    },`, `  };`, `}`, '');
    } else {
      lines.push(
        `      return (${fnArgs}) =>`,
        `        ${resourceCall}(() => ({`,
        `          url: \`\${base}${urlTemplate}\`,`,
      );
      appendResourceOptions(lines, ep, isGet, '          ', headerSchemes, querySchemes, false);
      lines.push(`        }));`, `    },`, `  };`, `}`, '');
    }
  }

  return lines.join('\n');
}

function appendResourceOptions(
  lines: string[],
  ep: EndpointModel,
  isGet: boolean,
  indent: string,
  headerSchemes: SecuritySchemeModel[],
  querySchemes: SecuritySchemeModel[],
  usePrecomputedParams = false,
): void {
  if (!isGet) {
    lines.push(`${indent}method: '${ep.method.toUpperCase()}',`);
  }

  const hasRegularParams = isGet && ep.hasQueryParams;
  const hasAuthQueryParams = querySchemes.length > 0;
  const hasSpecialParams = ep.specialQueryParams.length > 0 && hasRegularParams;

  if (hasRegularParams || hasAuthQueryParams) {
    const authQueryParts = querySchemes
      .map(
        (s) =>
          `...(${toCamelCase(s.schemeName)}?.() != null ? { ${JSON.stringify(s.apiKeyParamName ?? s.schemeName)}: \`\${${toCamelCase(s.schemeName)}()}\` } : {})`
      )
      .join(', ');
    const paramsExpr = hasSpecialParams
      ? `_serializeParams(_params)`
      : usePrecomputedParams
        ? '_params'
        : `(typeof params === 'function' ? params() : params)`;
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
    lines.push(`${indent}body,`);
  }

  const hasHeaderParams = ep.headerParams.length > 0;
  const hasCookieParams = ep.cookieParams.length > 0;
  if (headerSchemes.length > 0 || hasHeaderParams || hasCookieParams) {
    lines.push(`${indent}headers: {`);
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
      lines.push(`${indent}  ...(${varName}?.() != null ? ${headerEntryForScheme(s, varName)} : {}),`);
    }
    lines.push(`${indent}},`);
  }
}

function buildFnArgs(ep: EndpointModel, pascal: string, isGet: boolean): string {
  // Order: required path params, header params, cookie params, query params / body
  const args: string[] = ep.pathParams.map((p) => `${toCamelCase(p)}: string`);
  for (const h of ep.headerParams) {
    args.push(h.required ? `${toCamelCase(h.name)}: string` : `${toCamelCase(h.name)}?: string`);
  }
  for (const c of ep.cookieParams) {
    args.push(c.required ? `${toCamelCase(c.name)}: string` : `${toCamelCase(c.name)}?: string`);
  }
  if (isGet && ep.hasQueryParams)
    args.push(`params?: ${pascal}Params | (() => ${pascal}Params | undefined)`);
  if (!isGet && ep.hasBody)
    args.push(`body: ${pascal}Body | Signal<${pascal}Body>`);
  return args.join(', ');
}
