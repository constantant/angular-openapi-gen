import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_DELETE_PACKAGE_VERSION_FOR_ORG } from './packages-delete-package-version-for-org.token';

export function providePackagesDeletePackageVersionForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_DELETE_PACKAGE_VERSION_FOR_ORG,
    'PACKAGES_DELETE_PACKAGE_VERSION_FOR_ORG',
    initialBehavior,
  );
}
