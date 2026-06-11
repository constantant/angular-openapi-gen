import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY } from './actions-get-actions-cache-retention-limit-for-repository.token';
import type { ActionsGetActionsCacheRetentionLimitForRepositoryResponse } from './actions-get-actions-cache-retention-limit-for-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-actions-cache-retention-limit-for-repository',
  path: '/repos/{owner}/{repo}/actions/cache/retention-limit',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetActionsCacheRetentionLimitForRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheRetentionLimitForRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY,
    'ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
