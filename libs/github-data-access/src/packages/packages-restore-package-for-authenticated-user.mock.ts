import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_RESTORE_PACKAGE_FOR_AUTHENTICATED_USER } from './packages-restore-package-for-authenticated-user.token';

export function providePackagesRestorePackageForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_RESTORE_PACKAGE_FOR_AUTHENTICATED_USER,
    'PACKAGES_RESTORE_PACKAGE_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
