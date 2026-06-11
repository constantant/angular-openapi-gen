import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_DELETE_PACKAGE_VERSION_FOR_USER } from './packages-delete-package-version-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/delete-package-version-for-user',
  path: '/users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}',
  method: 'delete',
  tag: 'packages',
};

export function providePackagesDeletePackageVersionForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_DELETE_PACKAGE_VERSION_FOR_USER,
    'PACKAGES_DELETE_PACKAGE_VERSION_FOR_USER',
    initialBehavior,
    _meta,
  );
}
