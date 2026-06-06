import type { EndpointModel } from './endpoint-model';

function toPascalCase(str: string): string {
  return str
    .replace(/\//g, '-')
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function toCamelCase(str: string): string {
  const parts = str.split(/[-_]+/).filter(Boolean);
  return parts[0] + parts.slice(1).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

export function renderTokenFile(
  ep: EndpointModel,
  baseUrlToken: string,
  providedIn: 'root' | 'none' = 'none'
): string {
  const pascal = toPascalCase(ep.operationId);
  const urlTemplate = ep.apiPath.replace(/\{([\w-]+)\}/g, (_, p) => `\${${toCamelCase(p)}}`);
  const isGet = ep.method === 'get';
  const { responseStatus } = ep;

  const lines: string[] = [];

  // Imports
  const coreImports = ['InjectionToken', 'inject'];
  if (!isGet && ep.hasBody) coreImports.push('Signal');
  if (providedIn === 'none') coreImports.push('FactoryProvider');
  lines.push(`import { ${coreImports.join(', ')} } from '@angular/core';`);
  lines.push(`import { httpResource } from '@angular/common/http';`);
  lines.push(`import type { paths } from '../schema.d';`);
  lines.push(`import { ${baseUrlToken} } from '../api-base-url.token';`);
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

  if (providedIn === 'root') {
    lines.push(
      `  providedIn: 'root',`,
      `  factory: () => {`,
      `    const base = inject(${baseUrlToken});`,
      `    return (${fnArgs}) =>`,
      `      httpResource<${responseT}>(() => ({`,
      `        url: \`\${base}${urlTemplate}\`,`,
    );
    appendResourceOptions(lines, ep, isGet, '        ');
    lines.push(`      }));`, `  },`, `});`, '');
  } else {
    // providedIn: 'none' — token has no factory; provide via the helper below
    lines.push('');
    lines.push(
      `export function provide${pascal}(): FactoryProvider {`,
      `  return {`,
      `    provide: ${ep.tokenName},`,
      `    useFactory: () => {`,
      `      const base = inject(${baseUrlToken});`,
      `      return (${fnArgs}) =>`,
      `        httpResource<${responseT}>(() => ({`,
      `          url: \`\${base}${urlTemplate}\`,`,
    );
    appendResourceOptions(lines, ep, isGet, '          ');
    lines.push(`        }));`, `    },`, `  };`, `}`, '');
  }

  return lines.join('\n');
}

function appendResourceOptions(
  lines: string[],
  ep: EndpointModel,
  isGet: boolean,
  indent: string
): void {
  if (!isGet) {
    lines.push(`${indent}method: '${ep.method.toUpperCase()}',`);
  }
  if (isGet && ep.hasQueryParams) {
    lines.push(
      `${indent}params: (typeof params === 'function' ? params() : params) as unknown as Record<string, string | number | boolean | readonly (string | number | boolean)[]>,`
    );
  }
  if (!isGet && ep.hasBody) {
    lines.push(`${indent}body,`);
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
