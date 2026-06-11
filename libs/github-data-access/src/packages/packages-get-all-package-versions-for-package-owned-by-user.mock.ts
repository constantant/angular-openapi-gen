import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_USER } from './packages-get-all-package-versions-for-package-owned-by-user.token';
import type { PackagesGetAllPackageVersionsForPackageOwnedByUserResponse } from './packages-get-all-package-versions-for-package-owned-by-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/get-all-package-versions-for-package-owned-by-user',
  path: '/users/{username}/packages/{package_type}/{package_name}/versions',
  method: 'get',
  tag: 'packages',
};

export function providePackagesGetAllPackageVersionsForPackageOwnedByUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetAllPackageVersionsForPackageOwnedByUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_USER,
    'PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_USER',
    initialBehavior,
    _meta,
  );
}
