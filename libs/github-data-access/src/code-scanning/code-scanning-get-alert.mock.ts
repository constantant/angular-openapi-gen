import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_ALERT } from './code-scanning-get-alert.token';
import type { CodeScanningGetAlertResponse } from './code-scanning-get-alert.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/get-alert',
  path: '/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningGetAlertMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_ALERT,
    'CODE_SCANNING_GET_ALERT',
    initialBehavior,
    _meta,
  );
}
