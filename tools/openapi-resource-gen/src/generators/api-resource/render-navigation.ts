import type { EndpointModel } from './endpoint-model';
import { toCamelCase, toPascalCase } from './render-token';

/**
 * A navigation endpoint (a redirect meant for the browser, e.g. an OAuth login) is not an XHR call:
 * its token is a URL builder `(pathParams…, params?) => string`. No request, headers or auth are
 * involved, so there is no mock or MSW handler for it either.
 */
export function renderNavigationTokenFile(
  ep: EndpointModel,
  baseUrlToken: string,
  providedIn: 'root' | 'none' = 'none',
): string {
  const pascal = toPascalCase(ep.operationId);
  const urlTemplate = ep.apiPath.replace(/\{([\w-]+)\}/g, (_, p) => `\${encodeURIComponent(${toCamelCase(p)})}`);
  const paramsRequired = ep.hasRequiredQueryParams;
  const args = [
    ...ep.pathParams.map((p) => `${toCamelCase(p)}: string`),
    ...(ep.hasQueryParams ? [`params${paramsRequired ? '' : '?'}: ${pascal}Params`] : []),
  ];
  const fnType = `(${args.join(', ')}) => string`;
  const url = `\`\${base}${urlTemplate}\`${ep.hasQueryParams ? ' + toQueryString(params)' : ''}`;

  const lines: string[] = [
    `import { InjectionToken, inject${providedIn === 'none' ? ', FactoryProvider' : ''} } from '@angular/core';`,
    ...(ep.hasQueryParams ? [`import type { paths } from '../schema.d';`] : []),
    `import { ${baseUrlToken} } from '../api-base-url.token';`,
    ...(ep.hasQueryParams ? [`import { toQueryString } from '../query-params';`] : []),
    '',
  ];
  if (ep.hasQueryParams) {
    lines.push(`export type ${pascal}Params =`, `  paths['${ep.apiPath}']['${ep.method}']['parameters']['query'];`, '');
  }
  lines.push(`/** Builds the URL of ${ep.method.toUpperCase()} ${ep.apiPath} for browser navigation; no request is made. */`);
  if (ep.deprecated) lines.push('/** @deprecated */');
  if (providedIn === 'root') {
    lines.push(
      `export const ${ep.tokenName} = new InjectionToken<${fnType}>('${ep.tokenName}', {`,
      `  providedIn: 'root',`,
      `  factory: () => {`,
      `    const base = inject(${baseUrlToken});`,
      `    return (${args.join(', ')}) => ${url};`,
      `  },`,
      `});`,
      '',
    );
  } else {
    lines.push(
      `export const ${ep.tokenName} = new InjectionToken<${fnType}>('${ep.tokenName}');`,
      '',
      `export function provide${pascal}(): FactoryProvider {`,
      `  return {`,
      `    provide: ${ep.tokenName},`,
      `    useFactory: () => {`,
      `      const base = inject(${baseUrlToken});`,
      `      return (${args.join(', ')}) => ${url};`,
      `    },`,
      `  };`,
      `}`,
      '',
    );
  }
  return lines.join('\n');
}
