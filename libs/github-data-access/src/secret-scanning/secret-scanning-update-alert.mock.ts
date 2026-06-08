import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_UPDATE_ALERT } from './secret-scanning-update-alert.token';
import type { SecretScanningUpdateAlertResponse } from './secret-scanning-update-alert.token';

export function provideSecretScanningUpdateAlertMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningUpdateAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_UPDATE_ALERT,
    'SECRET_SCANNING_UPDATE_ALERT',
    initialBehavior,
  );
}
