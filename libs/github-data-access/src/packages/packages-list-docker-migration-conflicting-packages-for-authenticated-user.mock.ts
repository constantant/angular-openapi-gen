import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_AUTHENTICATED_USER } from './packages-list-docker-migration-conflicting-packages-for-authenticated-user.token';
import type { PackagesListDockerMigrationConflictingPackagesForAuthenticatedUserResponse } from './packages-list-docker-migration-conflicting-packages-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'packages/list-docker-migration-conflicting-packages-for-authenticated-user',
  path: '/user/docker/conflicts',
  method: 'get',
  tag: 'packages',
};

export function providePackagesListDockerMigrationConflictingPackagesForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<PackagesListDockerMigrationConflictingPackagesForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_AUTHENTICATED_USER,
    'PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
