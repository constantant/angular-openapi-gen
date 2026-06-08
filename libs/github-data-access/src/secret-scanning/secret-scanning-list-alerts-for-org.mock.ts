import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_LIST_ALERTS_FOR_ORG } from './secret-scanning-list-alerts-for-org.token';
import type { SecretScanningListAlertsForOrgResponse } from './secret-scanning-list-alerts-for-org.token';

export function provideSecretScanningListAlertsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningListAlertsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_LIST_ALERTS_FOR_ORG,
    'SECRET_SCANNING_LIST_ALERTS_FOR_ORG',
    initialBehavior,
  );
}
