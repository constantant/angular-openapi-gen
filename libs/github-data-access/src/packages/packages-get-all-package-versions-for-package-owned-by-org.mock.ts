import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_ORG } from './packages-get-all-package-versions-for-package-owned-by-org.token';
import type { PackagesGetAllPackageVersionsForPackageOwnedByOrgResponse } from './packages-get-all-package-versions-for-package-owned-by-org.token';

export function providePackagesGetAllPackageVersionsForPackageOwnedByOrgMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetAllPackageVersionsForPackageOwnedByOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_ORG,
    'PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_ORG',
    initialBehavior,
  );
}
