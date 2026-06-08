import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY } from './actions-get-actions-cache-retention-limit-for-repository.token';
import type { ActionsGetActionsCacheRetentionLimitForRepositoryResponse } from './actions-get-actions-cache-retention-limit-for-repository.token';

export function provideActionsGetActionsCacheRetentionLimitForRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheRetentionLimitForRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY,
    'ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY',
    initialBehavior,
  );
}
