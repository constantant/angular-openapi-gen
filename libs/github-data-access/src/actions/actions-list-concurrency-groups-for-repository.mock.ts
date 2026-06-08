import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_REPOSITORY } from './actions-list-concurrency-groups-for-repository.token';
import type { ActionsListConcurrencyGroupsForRepositoryResponse } from './actions-list-concurrency-groups-for-repository.token';

export function provideActionsListConcurrencyGroupsForRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListConcurrencyGroupsForRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_REPOSITORY,
    'ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_REPOSITORY',
    initialBehavior,
  );
}
