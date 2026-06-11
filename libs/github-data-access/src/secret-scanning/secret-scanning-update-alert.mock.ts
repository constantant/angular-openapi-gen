import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_UPDATE_ALERT } from './secret-scanning-update-alert.token';
import type { SecretScanningUpdateAlertResponse } from './secret-scanning-update-alert.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'secret-scanning/update-alert',
  path: '/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}',
  method: 'patch',
  tag: 'secret-scanning',
};

export function provideSecretScanningUpdateAlertMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningUpdateAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_UPDATE_ALERT,
    'SECRET_SCANNING_UPDATE_ALERT',
    initialBehavior,
    _meta,
  );
}
