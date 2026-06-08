import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION } from './actions-get-actions-cache-storage-limit-for-organization.token';
import type { ActionsGetActionsCacheStorageLimitForOrganizationResponse } from './actions-get-actions-cache-storage-limit-for-organization.token';

export function provideActionsGetActionsCacheStorageLimitForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheStorageLimitForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION,
    'ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION',
    initialBehavior,
  );
}
