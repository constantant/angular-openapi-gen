import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesListDockerMigrationConflictingPackagesForUserResponse =
  paths['/users/{username}/docker/conflicts']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_USER =
  new InjectionToken<
    (
      username: string,
    ) => ReturnType<
      typeof httpResource<PackagesListDockerMigrationConflictingPackagesForUserResponse>
    >
  >('PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_USER');

export function providePackagesListDockerMigrationConflictingPackagesForUser(): FactoryProvider {
  return {
    provide: PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (username: string) =>
        httpResource<PackagesListDockerMigrationConflictingPackagesForUserResponse>(
          () => ({
            url: `${base}/users/${username}/docker/conflicts`,
          }),
        );
    },
  };
}
