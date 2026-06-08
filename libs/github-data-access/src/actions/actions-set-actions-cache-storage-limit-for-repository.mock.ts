import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_REPOSITORY } from './actions-set-actions-cache-storage-limit-for-repository.token';

export function provideActionsSetActionsCacheStorageLimitForRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_REPOSITORY,
    'ACTIONS_SET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_REPOSITORY',
    initialBehavior,
  );
}
