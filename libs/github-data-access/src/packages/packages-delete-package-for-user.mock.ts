import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_DELETE_PACKAGE_FOR_USER } from './packages-delete-package-for-user.token';

export function providePackagesDeletePackageForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_DELETE_PACKAGE_FOR_USER,
    'PACKAGES_DELETE_PACKAGE_FOR_USER',
    initialBehavior,
  );
}
