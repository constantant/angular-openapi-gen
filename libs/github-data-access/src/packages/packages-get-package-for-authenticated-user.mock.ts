import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_PACKAGE_FOR_AUTHENTICATED_USER } from './packages-get-package-for-authenticated-user.token';
import type { PackagesGetPackageForAuthenticatedUserResponse } from './packages-get-package-for-authenticated-user.token';

export function providePackagesGetPackageForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetPackageForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_PACKAGE_FOR_AUTHENTICATED_USER,
    'PACKAGES_GET_PACKAGE_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
