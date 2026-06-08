import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_USAGE_FOR_ORG } from './actions-get-actions-cache-usage-for-org.token';
import type { ActionsGetActionsCacheUsageForOrgResponse } from './actions-get-actions-cache-usage-for-org.token';

export function provideActionsGetActionsCacheUsageForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheUsageForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_USAGE_FOR_ORG,
    'ACTIONS_GET_ACTIONS_CACHE_USAGE_FOR_ORG',
    initialBehavior,
  );
}
