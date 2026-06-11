import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_REPOSITORY } from './actions-list-concurrency-groups-for-repository.token';
import type { ActionsListConcurrencyGroupsForRepositoryResponse } from './actions-list-concurrency-groups-for-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-concurrency-groups-for-repository',
  path: '/repos/{owner}/{repo}/actions/concurrency_groups',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListConcurrencyGroupsForRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListConcurrencyGroupsForRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_REPOSITORY,
    'ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
