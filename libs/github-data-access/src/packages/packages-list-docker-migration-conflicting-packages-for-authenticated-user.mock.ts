import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_AUTHENTICATED_USER } from './packages-list-docker-migration-conflicting-packages-for-authenticated-user.token';
import type { PackagesListDockerMigrationConflictingPackagesForAuthenticatedUserResponse } from './packages-list-docker-migration-conflicting-packages-for-authenticated-user.token';

export function providePackagesListDockerMigrationConflictingPackagesForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesListDockerMigrationConflictingPackagesForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_AUTHENTICATED_USER,
    'PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
