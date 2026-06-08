import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_DELETE_PACKAGE_VERSION_FOR_AUTHENTICATED_USER } from './packages-delete-package-version-for-authenticated-user.token';

export function providePackagesDeletePackageVersionForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_DELETE_PACKAGE_VERSION_FOR_AUTHENTICATED_USER,
    'PACKAGES_DELETE_PACKAGE_VERSION_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
