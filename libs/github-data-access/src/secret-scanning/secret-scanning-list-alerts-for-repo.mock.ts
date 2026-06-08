import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_LIST_ALERTS_FOR_REPO } from './secret-scanning-list-alerts-for-repo.token';
import type { SecretScanningListAlertsForRepoResponse } from './secret-scanning-list-alerts-for-repo.token';

export function provideSecretScanningListAlertsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningListAlertsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_LIST_ALERTS_FOR_REPO,
    'SECRET_SCANNING_LIST_ALERTS_FOR_REPO',
    initialBehavior,
  );
}
