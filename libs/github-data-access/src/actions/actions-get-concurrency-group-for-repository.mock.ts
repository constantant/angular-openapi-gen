import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_CONCURRENCY_GROUP_FOR_REPOSITORY } from './actions-get-concurrency-group-for-repository.token';
import type { ActionsGetConcurrencyGroupForRepositoryResponse } from './actions-get-concurrency-group-for-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-concurrency-group-for-repository',
  path: '/repos/{owner}/{repo}/actions/concurrency_groups/{concurrency_group_name}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetConcurrencyGroupForRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetConcurrencyGroupForRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_CONCURRENCY_GROUP_FOR_REPOSITORY,
    'ACTIONS_GET_CONCURRENCY_GROUP_FOR_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
