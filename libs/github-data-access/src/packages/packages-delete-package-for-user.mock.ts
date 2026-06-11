import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_DELETE_PACKAGE_FOR_USER } from './packages-delete-package-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/delete-package-for-user',
  path: '/users/{username}/packages/{package_type}/{package_name}',
  method: 'delete',
  tag: 'packages',
};

export function providePackagesDeletePackageForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_DELETE_PACKAGE_FOR_USER,
    'PACKAGES_DELETE_PACKAGE_FOR_USER',
    initialBehavior,
    _meta,
  );
}
