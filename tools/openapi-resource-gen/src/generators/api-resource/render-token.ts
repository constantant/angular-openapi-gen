import type { EndpointModel } from './endpoint-model';

function toPascalCase(str: string): string {
  return str
    .replace(/\//g, '-')
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

export function renderTokenFile(
  ep: EndpointModel,
  baseUrlToken: string
): string {
  const pascal = toPascalCase(ep.operationId);
  const urlTemplate = ep.apiPath.replace(/\{(\w+)\}/g, '${$1}');
  const isGet = ep.method === 'get';
  const { responseStatus } = ep;

  const lines: string[] = [];

  // Imports
  const coreImports = ['InjectionToken', 'inject'];
  if (!isGet && ep.hasBody) coreImports.push('Signal');
  lines.push(`import { ${coreImports.join(', ')} } from '@angular/core';`);
  lines.push(`import { httpResource } from '@angular/common/http';`);
  lines.push(`import type { paths } from '../schema.d';`);
  lines.push(`import { ${baseUrlToken} } from '../api-base-url.token';`);
  lines.push('');

  // Type aliases sourced directly from the generated paths type.
  // NonNullable<> guards optional requestBody fields that are typed as T | undefined.
  if (isGet && ep.hasQueryParams) {
    lines.push(
      `type ${pascal}Params =`,
      `  paths['${ep.apiPath}']['${ep.method}']['parameters']['query'];`,
      ''
    );
  }
  if (!isGet && ep.hasBody && ep.bodyContentType) {
    lines.push(
      `type ${pascal}Body =`,
      `  NonNullable<paths['${ep.apiPath}']['${ep.method}']['requestBody']>['content']['${ep.bodyContentType}'];`,
      ''
    );
  }
  if (responseStatus) {
    lines.push(
      `type ${pascal}Response =`,
      `  paths['${ep.apiPath}']['${ep.method}']['responses']['${responseStatus}']['content']['application/json'];`,
      ''
    );
  }

  const responseT = responseStatus ? `${pascal}Response` : 'unknown';

  // Signature of the function the token vends
  const fnArgs = buildFnArgs(ep, pascal, isGet);

  lines.push(
    `export const ${ep.tokenName} = new InjectionToken<`,
    `  (${fnArgs}) => ReturnType<typeof httpResource<${responseT}>>`,
    `>('${ep.tokenName}', {`,
    `  providedIn: 'root',`,
    `  factory: () => {`,
    `    const base = inject(${baseUrlToken});`,
    `    return (${fnArgs}) =>`,
    `      httpResource<${responseT}>(() => ({`,
    `        url: \`\${base}${urlTemplate}\`,`
  );

  if (!isGet) {
    lines.push(`        method: '${ep.method.toUpperCase()}',`);
  }
  if (isGet && ep.hasQueryParams) {
    lines.push(`        params: (typeof params === 'function' ? params() : params) as unknown as Record<string, string | number | boolean | readonly (string | number | boolean)[]>,`);
  }
  if (!isGet && ep.hasBody) {
    lines.push(`        body,`);
  }

  lines.push(`      }));`, `  },`, `});`, '');

  return lines.join('\n');
}

function buildFnArgs(
  ep: EndpointModel,
  pascal: string,
  isGet: boolean
): string {
  const args: string[] = ep.pathParams.map((p) => `${p}: string`);
  if (isGet && ep.hasQueryParams) args.push(`params?: ${pascal}Params | (() => ${pascal}Params | undefined)`);
  if (!isGet && ep.hasBody)
    args.push(`body: ${pascal}Body | Signal<${pascal}Body>`);
  return args.join(', ');
}
