import type { EndpointModel } from './endpoint-model';
import { toPascalCase } from './render-token';

export function renderMockFile(ep: EndpointModel, specId: string): string {
  const pascal = toPascalCase(ep.operationId);
  const responseType = ep.hasResponse ? `${pascal}Response` : null;
  const responseImport = responseType
    ? `\nimport type { ${responseType} } from './${ep.fileName}.token';`
    : '';
  const behaviorType = responseType
    ? `ProviderInitialBehavior<${responseType}>`
    : `ProviderInitialBehavior<unknown>`;
  const tagLine = ep.tag !== 'default' ? `\n  tag: '${ep.tag}',` : '';

  return `import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior, MockResourceMeta } from '@constantant/openapi-resource-mocks';
import { ${ep.tokenName} } from './${ep.fileName}.token';${responseImport}

const _meta: MockResourceMeta = {
  specId: '${specId}',
  operationId: '${ep.operationId}',
  path: '${ep.apiPath}',
  method: '${ep.method}',${tagLine}
};

export function provide${pascal}Mock(
  initialBehavior?: ${behaviorType},
): FactoryProvider {
  return provideMockResource(${ep.tokenName}, '${ep.tokenName}', initialBehavior, _meta);
}
`;
}
