import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesListDockerMigrationConflictingPackagesForOrganizationResponse =
  paths['/orgs/{org}/docker/conflicts']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<PackagesListDockerMigrationConflictingPackagesForOrganizationResponse>
    >
  >('PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_ORGANIZATION');

export function providePackagesListDockerMigrationConflictingPackagesForOrganization(): FactoryProvider {
  return {
    provide:
      PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<PackagesListDockerMigrationConflictingPackagesForOrganizationResponse>(
          () => ({
            url: `${base}/orgs/${org}/docker/conflicts`,
          }),
        );
    },
  };
}
