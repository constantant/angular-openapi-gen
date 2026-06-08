import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_DELETE_PACKAGE_FOR_ORG } from './packages-delete-package-for-org.token';

export function providePackagesDeletePackageForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_DELETE_PACKAGE_FOR_ORG,
    'PACKAGES_DELETE_PACKAGE_FOR_ORG',
    initialBehavior,
  );
}
