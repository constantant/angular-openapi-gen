import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_RESTORE_PACKAGE_VERSION_FOR_USER } from './packages-restore-package-version-for-user.token';

export function providePackagesRestorePackageVersionForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_RESTORE_PACKAGE_VERSION_FOR_USER,
    'PACKAGES_RESTORE_PACKAGE_VERSION_FOR_USER',
    initialBehavior,
  );
}
