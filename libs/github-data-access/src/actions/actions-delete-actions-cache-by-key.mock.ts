import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ACTIONS_CACHE_BY_KEY } from './actions-delete-actions-cache-by-key.token';
import type { ActionsDeleteActionsCacheByKeyResponse } from './actions-delete-actions-cache-by-key.token';

export function provideActionsDeleteActionsCacheByKeyMock(
  initialBehavior?: ProviderInitialBehavior<ActionsDeleteActionsCacheByKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ACTIONS_CACHE_BY_KEY,
    'ACTIONS_DELETE_ACTIONS_CACHE_BY_KEY',
    initialBehavior,
  );
}
