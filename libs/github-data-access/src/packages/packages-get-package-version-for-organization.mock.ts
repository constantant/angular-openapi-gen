import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_PACKAGE_VERSION_FOR_ORGANIZATION } from './packages-get-package-version-for-organization.token';
import type { PackagesGetPackageVersionForOrganizationResponse } from './packages-get-package-version-for-organization.token';

export function providePackagesGetPackageVersionForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetPackageVersionForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_PACKAGE_VERSION_FOR_ORGANIZATION,
    'PACKAGES_GET_PACKAGE_VERSION_FOR_ORGANIZATION',
    initialBehavior,
  );
}
