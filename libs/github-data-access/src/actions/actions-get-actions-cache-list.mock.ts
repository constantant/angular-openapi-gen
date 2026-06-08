import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_LIST } from './actions-get-actions-cache-list.token';
import type { ActionsGetActionsCacheListResponse } from './actions-get-actions-cache-list.token';

export function provideActionsGetActionsCacheListMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheListResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_LIST,
    'ACTIONS_GET_ACTIONS_CACHE_LIST',
    initialBehavior,
  );
}
