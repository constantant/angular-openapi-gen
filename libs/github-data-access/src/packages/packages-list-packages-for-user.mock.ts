import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_LIST_PACKAGES_FOR_USER } from './packages-list-packages-for-user.token';
import type { PackagesListPackagesForUserResponse } from './packages-list-packages-for-user.token';

export function providePackagesListPackagesForUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesListPackagesForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_LIST_PACKAGES_FOR_USER,
    'PACKAGES_LIST_PACKAGES_FOR_USER',
    initialBehavior,
  );
}
