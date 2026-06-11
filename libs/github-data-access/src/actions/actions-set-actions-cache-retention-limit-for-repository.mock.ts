import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY } from './actions-set-actions-cache-retention-limit-for-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-actions-cache-retention-limit-for-repository',
  path: '/repos/{owner}/{repo}/actions/cache/retention-limit',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetActionsCacheRetentionLimitForRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY,
    'ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
