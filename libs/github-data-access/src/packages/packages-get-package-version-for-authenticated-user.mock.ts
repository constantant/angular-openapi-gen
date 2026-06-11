import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_PACKAGE_VERSION_FOR_AUTHENTICATED_USER } from './packages-get-package-version-for-authenticated-user.token';
import type { PackagesGetPackageVersionForAuthenticatedUserResponse } from './packages-get-package-version-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/get-package-version-for-authenticated-user',
  path: '/user/packages/{package_type}/{package_name}/versions/{package_version_id}',
  method: 'get',
  tag: 'packages',
};

export function providePackagesGetPackageVersionForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetPackageVersionForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_PACKAGE_VERSION_FOR_AUTHENTICATED_USER,
    'PACKAGES_GET_PACKAGE_VERSION_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
