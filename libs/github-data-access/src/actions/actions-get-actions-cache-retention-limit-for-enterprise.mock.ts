import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ENTERPRISE } from './actions-get-actions-cache-retention-limit-for-enterprise.token';
import type { ActionsGetActionsCacheRetentionLimitForEnterpriseResponse } from './actions-get-actions-cache-retention-limit-for-enterprise.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-actions-cache-retention-limit-for-enterprise',
  path: '/enterprises/{enterprise}/actions/cache/retention-limit',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetActionsCacheRetentionLimitForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheRetentionLimitForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ENTERPRISE,
    'ACTIONS_GET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ENTERPRISE',
    initialBehavior,
    _meta,
  );
}
