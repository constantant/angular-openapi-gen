import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_LIST_LOCATIONS_FOR_ALERT } from './secret-scanning-list-locations-for-alert.token';
import type { SecretScanningListLocationsForAlertResponse } from './secret-scanning-list-locations-for-alert.token';

export function provideSecretScanningListLocationsForAlertMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningListLocationsForAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_LIST_LOCATIONS_FOR_ALERT,
    'SECRET_SCANNING_LIST_LOCATIONS_FOR_ALERT',
    initialBehavior,
  );
}
