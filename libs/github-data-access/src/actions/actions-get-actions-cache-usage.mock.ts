import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_USAGE } from './actions-get-actions-cache-usage.token';
import type { ActionsGetActionsCacheUsageResponse } from './actions-get-actions-cache-usage.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-actions-cache-usage',
  path: '/repos/{owner}/{repo}/actions/cache/usage',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetActionsCacheUsageMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheUsageResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_USAGE,
    'ACTIONS_GET_ACTIONS_CACHE_USAGE',
    initialBehavior,
    _meta,
  );
}
