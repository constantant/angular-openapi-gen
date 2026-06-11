import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_GET_ALERT } from './secret-scanning-get-alert.token';
import type { SecretScanningGetAlertResponse } from './secret-scanning-get-alert.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'secret-scanning/get-alert',
  path: '/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}',
  method: 'get',
  tag: 'secret-scanning',
};

export function provideSecretScanningGetAlertMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningGetAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_GET_ALERT,
    'SECRET_SCANNING_GET_ALERT',
    initialBehavior,
    _meta,
  );
}
