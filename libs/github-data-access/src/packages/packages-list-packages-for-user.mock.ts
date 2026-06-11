import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_LIST_PACKAGES_FOR_USER } from './packages-list-packages-for-user.token';
import type { PackagesListPackagesForUserResponse } from './packages-list-packages-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/list-packages-for-user',
  path: '/users/{username}/packages',
  method: 'get',
  tag: 'packages',
};

export function providePackagesListPackagesForUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesListPackagesForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_LIST_PACKAGES_FOR_USER,
    'PACKAGES_LIST_PACKAGES_FOR_USER',
    initialBehavior,
    _meta,
  );
}
