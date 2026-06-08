import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_CONCURRENCY_GROUP_FOR_REPOSITORY } from './actions-get-concurrency-group-for-repository.token';
import type { ActionsGetConcurrencyGroupForRepositoryResponse } from './actions-get-concurrency-group-for-repository.token';

export function provideActionsGetConcurrencyGroupForRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetConcurrencyGroupForRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_CONCURRENCY_GROUP_FOR_REPOSITORY,
    'ACTIONS_GET_CONCURRENCY_GROUP_FOR_REPOSITORY',
    initialBehavior,
  );
}
