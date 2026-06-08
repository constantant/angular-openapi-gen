import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_USAGE } from './actions-get-actions-cache-usage.token';
import type { ActionsGetActionsCacheUsageResponse } from './actions-get-actions-cache-usage.token';

export function provideActionsGetActionsCacheUsageMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheUsageResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_USAGE,
    'ACTIONS_GET_ACTIONS_CACHE_USAGE',
    initialBehavior,
  );
}
