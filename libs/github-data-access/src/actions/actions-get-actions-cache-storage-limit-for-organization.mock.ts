import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION } from './actions-get-actions-cache-storage-limit-for-organization.token';
import type { ActionsGetActionsCacheStorageLimitForOrganizationResponse } from './actions-get-actions-cache-storage-limit-for-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-actions-cache-storage-limit-for-organization',
  path: '/organizations/{org}/actions/cache/storage-limit',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetActionsCacheStorageLimitForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetActionsCacheStorageLimitForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION,
    'ACTIONS_GET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
