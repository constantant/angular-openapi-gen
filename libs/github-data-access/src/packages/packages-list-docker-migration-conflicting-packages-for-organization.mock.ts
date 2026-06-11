import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_ORGANIZATION } from './packages-list-docker-migration-conflicting-packages-for-organization.token';
import type { PackagesListDockerMigrationConflictingPackagesForOrganizationResponse } from './packages-list-docker-migration-conflicting-packages-for-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'packages/list-docker-migration-conflicting-packages-for-organization',
  path: '/orgs/{org}/docker/conflicts',
  method: 'get',
  tag: 'packages',
};

export function providePackagesListDockerMigrationConflictingPackagesForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<PackagesListDockerMigrationConflictingPackagesForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_ORGANIZATION,
    'PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
