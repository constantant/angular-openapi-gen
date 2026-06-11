import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ACTIONS_CACHE_BY_KEY } from './actions-delete-actions-cache-by-key.token';
import type { ActionsDeleteActionsCacheByKeyResponse } from './actions-delete-actions-cache-by-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-actions-cache-by-key',
  path: '/repos/{owner}/{repo}/actions/caches',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteActionsCacheByKeyMock(
  initialBehavior?: ProviderInitialBehavior<ActionsDeleteActionsCacheByKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ACTIONS_CACHE_BY_KEY,
    'ACTIONS_DELETE_ACTIONS_CACHE_BY_KEY',
    initialBehavior,
    _meta,
  );
}
