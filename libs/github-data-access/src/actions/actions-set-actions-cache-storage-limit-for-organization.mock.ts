import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION } from './actions-set-actions-cache-storage-limit-for-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-actions-cache-storage-limit-for-organization',
  path: '/organizations/{org}/actions/cache/storage-limit',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetActionsCacheStorageLimitForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION,
    'ACTIONS_SET_ACTIONS_CACHE_STORAGE_LIMIT_FOR_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
