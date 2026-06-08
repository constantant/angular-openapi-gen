import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_GET_ALERT } from './secret-scanning-get-alert.token';
import type { SecretScanningGetAlertResponse } from './secret-scanning-get-alert.token';

export function provideSecretScanningGetAlertMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningGetAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_GET_ALERT,
    'SECRET_SCANNING_GET_ALERT',
    initialBehavior,
  );
}
