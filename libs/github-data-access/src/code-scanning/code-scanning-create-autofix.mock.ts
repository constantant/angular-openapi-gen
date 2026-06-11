import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_CREATE_AUTOFIX } from './code-scanning-create-autofix.token';
import type { CodeScanningCreateAutofixResponse } from './code-scanning-create-autofix.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/create-autofix',
  path: '/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix',
  method: 'post',
  tag: 'code-scanning',
};

export function provideCodeScanningCreateAutofixMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningCreateAutofixResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_CREATE_AUTOFIX,
    'CODE_SCANNING_CREATE_AUTOFIX',
    initialBehavior,
    _meta,
  );
}
