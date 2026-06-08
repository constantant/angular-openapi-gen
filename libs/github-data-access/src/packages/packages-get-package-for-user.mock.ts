import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_GET_PACKAGE_FOR_USER } from './packages-get-package-for-user.token';
import type { PackagesGetPackageForUserResponse } from './packages-get-package-for-user.token';

export function providePackagesGetPackageForUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesGetPackageForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_GET_PACKAGE_FOR_USER,
    'PACKAGES_GET_PACKAGE_FOR_USER',
    initialBehavior,
  );
}
