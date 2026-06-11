import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_LIST_PACKAGES_FOR_AUTHENTICATED_USER } from './packages-list-packages-for-authenticated-user.token';
import type { PackagesListPackagesForAuthenticatedUserResponse } from './packages-list-packages-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/list-packages-for-authenticated-user',
  path: '/user/packages',
  method: 'get',
  tag: 'packages',
};

export function providePackagesListPackagesForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesListPackagesForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_LIST_PACKAGES_FOR_AUTHENTICATED_USER,
    'PACKAGES_LIST_PACKAGES_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
