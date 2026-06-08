import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_PACKAGE_FOR_ORGANIZATION } from './packages-get-package-for-organization.token';
import type { PackagesGetPackageForOrganizationResponse } from './packages-get-package-for-organization.token';

export function providePackagesGetPackageForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetPackageForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_PACKAGE_FOR_ORGANIZATION,
    'PACKAGES_GET_PACKAGE_FOR_ORGANIZATION',
    initialBehavior,
  );
}
