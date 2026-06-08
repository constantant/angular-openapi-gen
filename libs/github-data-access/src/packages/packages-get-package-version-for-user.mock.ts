import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_PACKAGE_VERSION_FOR_USER } from './packages-get-package-version-for-user.token';
import type { PackagesGetPackageVersionForUserResponse } from './packages-get-package-version-for-user.token';

export function providePackagesGetPackageVersionForUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetPackageVersionForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_PACKAGE_VERSION_FOR_USER,
    'PACKAGES_GET_PACKAGE_VERSION_FOR_USER',
    initialBehavior,
  );
}
