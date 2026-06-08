import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ENTERPRISE } from './actions-get-actions-cache-storage-limit-for-enterprise.token';
import type { ActionsGetActionsCacheStorageLimitForEnterpriseResponse } from './actions-get-actions-cache-storage-limit-for-enterprise.token';

export function provideActionsGetActionsCacheStorageLimitForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheStorageLimitForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ENTERPRISE,
    'ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ENTERPRISE',
    initialBehavior,
  );
}
