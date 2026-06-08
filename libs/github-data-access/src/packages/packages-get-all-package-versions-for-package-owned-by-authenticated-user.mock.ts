import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_AUTHENTICATED_USER } from './packages-get-all-package-versions-for-package-owned-by-authenticated-user.token';
import type { PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserResponse } from './packages-get-all-package-versions-for-package-owned-by-authenticated-user.token';

export function providePackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_AUTHENTICATED_USER,
    'PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_AUTHENTICATED_USER',
    initialBehavior,
  );
}
