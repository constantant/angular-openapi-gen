import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ORGANIZATION } from './actions-set-actions-cache-retention-limit-for-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-actions-cache-retention-limit-for-organization',
  path: '/organizations/{org}/actions/cache/retention-limit',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetActionsCacheRetentionLimitForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ORGANIZATION,
    'ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
