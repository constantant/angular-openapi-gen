import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_UPDATE_ALERT } from './code-scanning-update-alert.token';
import type { CodeScanningUpdateAlertResponse } from './code-scanning-update-alert.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/update-alert',
  path: '/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}',
  method: 'patch',
  tag: 'code-scanning',
};

export function provideCodeScanningUpdateAlertMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningUpdateAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_UPDATE_ALERT,
    'CODE_SCANNING_UPDATE_ALERT',
    initialBehavior,
    _meta,
  );
}
