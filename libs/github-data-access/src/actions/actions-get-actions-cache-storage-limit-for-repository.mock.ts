import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_REPOSITORY } from './actions-get-actions-cache-storage-limit-for-repository.token';
import type { ActionsGetActionsCacheStorageLimitForRepositoryResponse } from './actions-get-actions-cache-storage-limit-for-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-actions-cache-storage-limit-for-repository',
  path: '/repos/{owner}/{repo}/actions/cache/storage-limit',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetActionsCacheStorageLimitForRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheStorageLimitForRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_REPOSITORY,
    'ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
