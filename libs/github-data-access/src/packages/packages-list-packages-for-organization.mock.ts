import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_LIST_PACKAGES_FOR_ORGANIZATION } from './packages-list-packages-for-organization.token';
import type { PackagesListPackagesForOrganizationResponse } from './packages-list-packages-for-organization.token';

export function providePackagesListPackagesForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<PackagesListPackagesForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_LIST_PACKAGES_FOR_ORGANIZATION,
    'PACKAGES_LIST_PACKAGES_FOR_ORGANIZATION',
    initialBehavior,
  );
}
