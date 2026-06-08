import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_USER } from './packages-list-docker-migration-conflicting-packages-for-user.token';
import type { PackagesListDockerMigrationConflictingPackagesForUserResponse } from './packages-list-docker-migration-conflicting-packages-for-user.token';

export function providePackagesListDockerMigrationConflictingPackagesForUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesListDockerMigrationConflictingPackagesForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_USER,
    'PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_USER',
    initialBehavior,
  );
}
