import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_SARIF } from './code-scanning-get-sarif.token';
import type { CodeScanningGetSarifResponse } from './code-scanning-get-sarif.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/get-sarif',
  path: '/repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningGetSarifMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetSarifResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_SARIF,
    'CODE_SCANNING_GET_SARIF',
    initialBehavior,
    _meta,
  );
}
