import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_REPOSITORY } from './actions-get-actions-cache-storage-limit-for-repository.token';
import type { ActionsGetActionsCacheStorageLimitForRepositoryResponse } from './actions-get-actions-cache-storage-limit-for-repository.token';

export function provideActionsGetActionsCacheStorageLimitForRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheStorageLimitForRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_REPOSITORY,
    'ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_REPOSITORY',
    initialBehavior,
  );
}
