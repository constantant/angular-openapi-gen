import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_RESTORE_PACKAGE_FOR_ORG } from './packages-restore-package-for-org.token';

export function providePackagesRestorePackageForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_RESTORE_PACKAGE_FOR_ORG,
    'PACKAGES_RESTORE_PACKAGE_FOR_ORG',
    initialBehavior,
  );
}
