import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_PACKAGE_VERSION_FOR_AUTHENTICATED_USER } from './packages-get-package-version-for-authenticated-user.token';
import type { PackagesGetPackageVersionForAuthenticatedUserResponse } from './packages-get-package-version-for-authenticated-user.token';

export function providePackagesGetPackageVersionForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetPackageVersionForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_PACKAGE_VERSION_FOR_AUTHENTICATED_USER,
    'PACKAGES_GET_PACKAGE_VERSION_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
