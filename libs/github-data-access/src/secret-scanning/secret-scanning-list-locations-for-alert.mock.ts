import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_LIST_LOCATIONS_FOR_ALERT } from './secret-scanning-list-locations-for-alert.token';
import type { SecretScanningListLocationsForAlertResponse } from './secret-scanning-list-locations-for-alert.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'secret-scanning/list-locations-for-alert',
  path: '/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations',
  method: 'get',
  tag: 'secret-scanning',
};

export function provideSecretScanningListLocationsForAlertMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningListLocationsForAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_LIST_LOCATIONS_FOR_ALERT,
    'SECRET_SCANNING_LIST_LOCATIONS_FOR_ALERT',
    initialBehavior,
    _meta,
  );
}
