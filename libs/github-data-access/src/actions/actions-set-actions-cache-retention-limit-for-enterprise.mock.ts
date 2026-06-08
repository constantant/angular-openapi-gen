import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ENTERPRISE } from './actions-set-actions-cache-retention-limit-for-enterprise.token';

export function provideActionsSetActionsCacheRetentionLimitForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ENTERPRISE,
    'ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ENTERPRISE',
    initialBehavior,
  );
}
