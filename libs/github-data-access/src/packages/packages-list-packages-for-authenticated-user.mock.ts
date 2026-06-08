import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_LIST_PACKAGES_FOR_AUTHENTICATED_USER } from './packages-list-packages-for-authenticated-user.token';
import type { PackagesListPackagesForAuthenticatedUserResponse } from './packages-list-packages-for-authenticated-user.token';

export function providePackagesListPackagesForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesListPackagesForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_LIST_PACKAGES_FOR_AUTHENTICATED_USER,
    'PACKAGES_LIST_PACKAGES_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
