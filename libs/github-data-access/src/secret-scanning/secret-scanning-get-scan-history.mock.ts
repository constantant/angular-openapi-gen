import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_GET_SCAN_HISTORY } from './secret-scanning-get-scan-history.token';
import type { SecretScanningGetScanHistoryResponse } from './secret-scanning-get-scan-history.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'secret-scanning/get-scan-history',
  path: '/repos/{owner}/{repo}/secret-scanning/scan-history',
  method: 'get',
  tag: 'secret-scanning',
};

export function provideSecretScanningGetScanHistoryMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningGetScanHistoryResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_GET_SCAN_HISTORY,
    'SECRET_SCANNING_GET_SCAN_HISTORY',
    initialBehavior,
    _meta,
  );
}
