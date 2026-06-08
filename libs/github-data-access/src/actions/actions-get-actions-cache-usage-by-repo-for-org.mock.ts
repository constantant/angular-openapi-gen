import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_USAGE_BY_REPO_FOR_ORG } from './actions-get-actions-cache-usage-by-repo-for-org.token';
import type { ActionsGetActionsCacheUsageByRepoForOrgResponse } from './actions-get-actions-cache-usage-by-repo-for-org.token';

export function provideActionsGetActionsCacheUsageByRepoForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheUsageByRepoForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_USAGE_BY_REPO_FOR_ORG,
    'ACTIONS_GET_ACTIONS_CACHE_USAGE_BY_REPO_FOR_ORG',
    initialBehavior,
  );
}
