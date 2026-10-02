import type { EndpointModel } from './endpoint-model';
import { fnArgNames, toPascalCase, yieldsHttpEvents, type ClientType } from './render-token';

export function renderMockFile(
  ep: EndpointModel,
  specId: string,
  client: ClientType = 'httpResource',
  reportProgress = false,
  callOptions = false,
): string {
  // Tokens that yield Observable<HttpEvent<T>> need a mock that emits events, not bare values.
  const provideFn = yieldsHttpEvents(ep, client, reportProgress)
    ? 'provideMockHttpEvents'
    : client === 'httpClient'
      ? 'provideMockObservable'
      : 'provideMockResource';
  const pascal = toPascalCase(ep.operationId);
  const responseType = ep.hasResponse ? `${pascal}Response` : null;
  const responseImport = responseType
    ? `\nimport type { ${responseType} } from './${ep.fileName}.token';`
    : '';
  const behaviorType = responseType
    ? `ProviderInitialBehavior<${responseType}>`
    : `ProviderInitialBehavior<unknown>`;
  const tagLine = ep.tag !== 'default' ? `\n  tag: '${ep.tag}',` : '';
  // With call options the token takes a trailing `options` argument, which DevTools can't tell apart
  // from a body or query argument without the names.
  const argsLine = callOptions
    ? `\n  args: [${fnArgNames(ep, client, callOptions).map((n) => `'${n}'`).join(', ')}],`
    : '';

  return `import { FactoryProvider } from '@angular/core';
import { ${provideFn} } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior, MockProviderOptions, MockResourceMeta } from '@constantant/openapi-resource-mocks';
import { ${ep.tokenName} } from './${ep.fileName}.token';${responseImport}

const _meta: MockResourceMeta = {
  specId: '${specId}',
  operationId: '${ep.operationId}',
  path: '${ep.apiPath}',
  method: '${ep.method}',${tagLine}${argsLine}
};

export function provide${pascal}Mock(
  initialBehavior?: ${behaviorType},
  options?: MockProviderOptions,
): FactoryProvider {
  return ${provideFn}(${ep.tokenName}, '${ep.tokenName}', initialBehavior, _meta, options);
}
`;
}
