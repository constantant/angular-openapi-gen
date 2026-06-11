import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ORGANIZATION } from './actions-get-actions-cache-retention-limit-for-organization.token';
import type { ActionsGetActionsCacheRetentionLimitForOrganizationResponse } from './actions-get-actions-cache-retention-limit-for-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-actions-cache-retention-limit-for-organization',
  path: '/organizations/{org}/actions/cache/retention-limit',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetActionsCacheRetentionLimitForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheRetentionLimitForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ORGANIZATION,
    'ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
