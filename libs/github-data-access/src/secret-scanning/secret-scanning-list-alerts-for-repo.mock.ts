import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECRET_SCANNING_LIST_ALERTS_FOR_REPO } from './secret-scanning-list-alerts-for-repo.token';
import type { SecretScanningListAlertsForRepoResponse } from './secret-scanning-list-alerts-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'secret-scanning/list-alerts-for-repo',
  path: '/repos/{owner}/{repo}/secret-scanning/alerts',
  method: 'get',
  tag: 'secret-scanning',
};

export function provideSecretScanningListAlertsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<SecretScanningListAlertsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    SECRET_SCANNING_LIST_ALERTS_FOR_REPO,
    'SECRET_SCANNING_LIST_ALERTS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
