import type { EndpointModel } from './endpoint-model';
import { toPascalCase } from './render-token';

/**
 * A mock file does not replace the endpoint's token: it describes the endpoint (method + path under
 * the API's base URL) to the transport-level mocking layer, so it is the same for every client type.
 * It exports the descriptor (`LIST_PETS_MOCK`, used by the testing helpers) and `provideListPetsMock()`.
 */
export function renderMockFile(
  ep: EndpointModel,
  specId: string,
  baseUrlToken = 'API_BASE_URL',
  providedIn: 'root' | 'none' = 'none',
): string {
  const pascal = toPascalCase(ep.operationId);
  const responseType = ep.hasResponse ? `${pascal}Response` : null;
  const responseT = responseType ?? 'unknown';
  // A `providedIn: 'root'` token needs no provider; otherwise tests get the real one via the descriptor.
  const tokenImports = [
    ...(providedIn === 'none' ? [`provide${pascal}`] : []),
    ...(responseType ? [`type ${responseType}`] : []),
  ];
  const tokenImport = tokenImports.length
    ? `\nimport { ${tokenImports.join(', ')} } from './${ep.fileName}.token';`
    : '';
  const provideLine = providedIn === 'none' ? `\n  provide: provide${pascal},` : '';
  const tagLine = ep.tag !== 'default' ? `\n  tag: '${ep.tag}',` : '';
  // JSON is the default; only a text or blob response has to be declared so the mock sends it raw.
  const responseTypeLine =
    ep.responseVariant && ep.responseVariant !== 'json' ? `\n  responseType: '${ep.responseVariant}',` : '';

  return `import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type { MockEndpoint, MockEndpointBehavior, MockResourceMeta } from '@constantant/openapi-resource-mocks';
import { ${baseUrlToken} } from '../api-base-url.token';${tokenImport}

const _meta: MockResourceMeta = {
  specId: '${specId}',
  operationId: '${ep.operationId}',
  path: '${ep.apiPath}',
  method: '${ep.method}',${tagLine}${responseTypeLine}
};

export const ${ep.tokenName}_MOCK: MockEndpoint<${responseT}> = {
  key: '${ep.tokenName}',
  baseUrl: ${baseUrlToken},
  meta: _meta,${provideLine}
};

export function provide${pascal}Mock(
  initialBehavior?: MockEndpointBehavior<${responseT}>,
): EnvironmentProviders {
  return provideMockEndpoint(${ep.tokenName}_MOCK, initialBehavior);
}
`;
}
