import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_RESTORE_PACKAGE_VERSION_FOR_ORG } from './packages-restore-package-version-for-org.token';

export function providePackagesRestorePackageVersionForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_RESTORE_PACKAGE_VERSION_FOR_ORG,
    'PACKAGES_RESTORE_PACKAGE_VERSION_FOR_ORG',
    initialBehavior,
  );
}
