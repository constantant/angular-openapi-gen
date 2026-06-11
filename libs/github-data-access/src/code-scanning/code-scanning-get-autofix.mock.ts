import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_AUTOFIX } from './code-scanning-get-autofix.token';
import type { CodeScanningGetAutofixResponse } from './code-scanning-get-autofix.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/get-autofix',
  path: '/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningGetAutofixMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetAutofixResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_AUTOFIX,
    'CODE_SCANNING_GET_AUTOFIX',
    initialBehavior,
    _meta,
  );
}
