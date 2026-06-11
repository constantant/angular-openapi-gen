import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ACTIONS_CACHE_BY_ID } from './actions-delete-actions-cache-by-id.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-actions-cache-by-id',
  path: '/repos/{owner}/{repo}/actions/caches/{cache_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteActionsCacheByIdMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ACTIONS_CACHE_BY_ID,
    'ACTIONS_DELETE_ACTIONS_CACHE_BY_ID',
    initialBehavior,
    _meta,
  );
}
