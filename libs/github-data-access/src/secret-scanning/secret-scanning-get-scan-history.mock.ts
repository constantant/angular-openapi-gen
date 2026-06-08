import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_GET_SCAN_HISTORY } from './secret-scanning-get-scan-history.token';
import type { SecretScanningGetScanHistoryResponse } from './secret-scanning-get-scan-history.token';

export function provideSecretScanningGetScanHistoryMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningGetScanHistoryResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_GET_SCAN_HISTORY,
    'SECRET_SCANNING_GET_SCAN_HISTORY',
    initialBehavior,
  );
}
