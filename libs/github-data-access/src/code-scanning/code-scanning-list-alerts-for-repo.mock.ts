import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_LIST_ALERTS_FOR_REPO } from './code-scanning-list-alerts-for-repo.token';
import type { CodeScanningListAlertsForRepoResponse } from './code-scanning-list-alerts-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/list-alerts-for-repo',
  path: '/repos/{owner}/{repo}/code-scanning/alerts',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningListAlertsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningListAlertsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_LIST_ALERTS_FOR_REPO,
    'CODE_SCANNING_LIST_ALERTS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
