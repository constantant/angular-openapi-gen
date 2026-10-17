import type { EndpointModel } from './endpoint-model';
import { toPascalCase } from './render-token';

/** The names of the type aliases a token file exports for an endpoint. */
export function endpointTypeNames(ep: EndpointModel): {
  response: string | null;
  errors: string | null;
  body: string | null;
  params: string | null;
} {
  const pascal = toPascalCase(ep.operationId);
  return {
    response: ep.hasResponse ? `${pascal}Response` : null,
    errors: ep.errorStatuses.length > 0 ? `${pascal}Errors` : null,
    body: ep.method !== 'get' && ep.hasBody && ep.bodyContentType ? `${pascal}Body` : null,
    params: ep.hasQueryParams ? `${pascal}Params` : null,
  };
}

/**
 * `mocks.endpoints.ts`: every mockable endpoint as plain data, plus type maps keyed by the mock key.
 * It imports token files for their types only (`import type`, erased at runtime), so Node tools
 * such as Playwright tests and contract checks can import it without loading Angular.
 */
export function renderEndpointsFile(endpoints: EndpointModel[], specId: string): string {
  const lines: string[] = [
    `// Framework-free description of the API's endpoints (no runtime imports), for Node tools such as`,
    `// Playwright tests and contract checks. The types come from the token files and are erased at runtime.`,
  ];
  const typeNames = endpoints.map((ep) => ({ ep, names: endpointTypeNames(ep) }));
  for (const { ep, names } of typeNames) {
    const imported = [names.response, names.errors, names.body, names.params].filter((n): n is string => n !== null);
    if (imported.length > 0) lines.push(`import type { ${imported.join(', ')} } from './${ep.tag}/${ep.fileName}.token';`);
  }
  lines.push('', `export const SPEC_ID = '${specId}';`, '', 'export const ENDPOINTS = {');
  for (const ep of endpoints) {
    lines.push(
      `  ${ep.tokenName}: {`,
      `    key: '${ep.tokenName}',`,
      `    specId: '${specId}',`,
      `    operationId: '${ep.operationId}',`,
      `    method: '${ep.method}',`,
      `    path: '${ep.apiPath}',`,
      ...(ep.tag !== 'default' ? [`    tag: '${ep.tag}',`] : []),
      `    responseType: '${ep.responseVariant}',`,
      `  },`,
    );
  }
  lines.push(
    '} as const;',
    '',
    'export type EndpointKey = keyof typeof ENDPOINTS;',
    '',
  );

  const map = (name: string, doc: string, pick: (names: ReturnType<typeof endpointTypeNames>) => string | null, missing: string) => {
    lines.push(`/** ${doc} */`, `export interface ${name} {`);
    for (const { ep, names } of typeNames) lines.push(`  ${ep.tokenName}: ${pick(names) ?? missing};`);
    lines.push('}', '');
  };
  map('EndpointResponses', 'The success response body of each endpoint (`undefined` when it has none).', (n) => n.response, 'undefined');
  map(
    'EndpointErrors',
    "The documented error bodies of each endpoint, keyed by status (`'404'`, `'4XX'`, `'default'`).",
    (n) => n.errors,
    'Record<never, never>',
  );
  map('EndpointBodies', 'The request body of each endpoint (`never` when it takes none).', (n) => n.body, 'never');
  map('EndpointParams', 'The query parameters of each endpoint (`never` when it takes none).', (n) => n.params, 'never');
  return lines.join('\n');
}
