import type { EndpointModel, SecuritySchemeModel } from './endpoint-model';

function toPascalCase(str: string): string {
  return str
    .replace(/\//g, '-')
    .split(/[-_.\s]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function toCamelCase(str: string): string {
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

export function renderSecurityTokenFile(scheme: SecuritySchemeModel): string {
  return [
    `import { InjectionToken, Signal } from '@angular/core';`,
    ``,
    `export const ${scheme.tokenName} = new InjectionToken<Signal<string | null>>('${scheme.tokenName}');`,
    ``,
  ].join('\n');
}

export function renderTokenFile(
  ep: EndpointModel,
  baseUrlToken: string,
  providedIn: 'root' | 'none' = 'none',
  schemesByName: Map<string, SecuritySchemeModel> = new Map()
): string {
  const pascal = toPascalCase(ep.operationId);
  const urlTemplate = ep.apiPath.replace(/\{([\w-]+)\}/g, (_, p) => `\${${toCamelCase(p)}}`);
  const isGet = ep.method === 'get';
  const { responseStatus } = ep;

  const applicableSchemes = ep.securitySchemeNames
    .map((name) => schemesByName.get(name))
    .filter((s): s is SecuritySchemeModel => s !== undefined);
  const headerSchemes = applicableSchemes.filter((s) => s.kind !== 'apiKey-query');
  const querySchemes = applicableSchemes.filter((s) => s.kind === 'apiKey-query');

  const lines: string[] = [];

  // Imports
  const coreImports = ['InjectionToken', 'inject'];
  if (!isGet && ep.hasBody) coreImports.push('Signal');
  if (providedIn === 'none') coreImports.push('FactoryProvider');
  lines.push(`import { ${coreImports.join(', ')} } from '@angular/core';`);
  lines.push(`import { httpResource } from '@angular/common/http';`);
  lines.push(`import type { paths } from '../schema.d';`);
  lines.push(`import { ${baseUrlToken} } from '../api-base-url.token';`);
  for (const scheme of applicableSchemes) {
    lines.push(`import { ${scheme.tokenName} } from '../${scheme.fileName}';`);
  }
  lines.push('');

  // Exported type aliases sourced directly from the generated paths type.
  // NonNullable<> guards optional requestBody fields that are typed as T | undefined.
  if (isGet && ep.hasQueryParams) {
    lines.push(
      `export type ${pascal}Params =`,
      `  paths['${ep.apiPath}']['${ep.method}']['parameters']['query'];`,
      ''
    );
  }
  if (!isGet && ep.hasBody && ep.bodyContentType) {
    lines.push(
      `export type ${pascal}Body =`,
      `  NonNullable<paths['${ep.apiPath}']['${ep.method}']['requestBody']>['content']['${ep.bodyContentType}'];`,
      ''
    );
  }
  if (responseStatus) {
    lines.push(
      `export type ${pascal}Response =`,
      `  paths['${ep.apiPath}']['${ep.method}']['responses']['${responseStatus}']['content']['application/json'];`,
      ''
    );
  }

  const responseT = responseStatus ? `${pascal}Response` : 'unknown';
  const fnArgs = buildFnArgs(ep, pascal, isGet);

  lines.push(
    `export const ${ep.tokenName} = new InjectionToken<`,
    `  (${fnArgs}) => ReturnType<typeof httpResource<${responseT}>>`,
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
        `      httpResource<${responseT}>(() => {`,
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
        `      httpResource<${responseT}>(() => ({`,
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
        `        httpResource<${responseT}>(() => {`,
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
        `        httpResource<${responseT}>(() => ({`,
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

  if (hasRegularParams || hasAuthQueryParams) {
    const authQueryParts = querySchemes
      .map(
        (s) =>
          `...(${toCamelCase(s.schemeName)}?.() != null ? { ${JSON.stringify(s.apiKeyParamName ?? s.schemeName)}: \`\${${toCamelCase(s.schemeName)}()}\` } : {})`
      )
      .join(', ');
    const paramsExpr = usePrecomputedParams
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

  if (headerSchemes.length > 0) {
    lines.push(`${indent}headers: {`);
    for (const s of headerSchemes) {
      const varName = toCamelCase(s.schemeName);
      lines.push(`${indent}  ...(${varName}?.() != null ? ${headerEntryForScheme(s, varName)} : {}),`);
    }
    lines.push(`${indent}},`);
  }
}

function buildFnArgs(ep: EndpointModel, pascal: string, isGet: boolean): string {
  const args: string[] = ep.pathParams.map((p) => `${toCamelCase(p)}: string`);
  if (isGet && ep.hasQueryParams)
    args.push(`params?: ${pascal}Params | (() => ${pascal}Params | undefined)`);
  if (!isGet && ep.hasBody)
    args.push(`body: ${pascal}Body | Signal<${pascal}Body>`);
  return args.join(', ');
}
