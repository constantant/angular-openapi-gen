import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_RESTORE_PACKAGE_VERSION_FOR_AUTHENTICATED_USER } from './packages-restore-package-version-for-authenticated-user.token';

export function providePackagesRestorePackageVersionForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_RESTORE_PACKAGE_VERSION_FOR_AUTHENTICATED_USER,
    'PACKAGES_RESTORE_PACKAGE_VERSION_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
