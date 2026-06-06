import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesListDockerMigrationConflictingPackagesForAuthenticatedUserResponse =
  paths['/user/docker/conflicts']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    () => ReturnType<
      typeof httpResource<PackagesListDockerMigrationConflictingPackagesForAuthenticatedUserResponse>
    >
  >(
    'PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_AUTHENTICATED_USER',
  );

export function providePackagesListDockerMigrationConflictingPackagesForAuthenticatedUser(): FactoryProvider {
  return {
    provide:
      PACKAGES_LIST_DOCKER_MIGRATION_CONFLICTING_PACKAGES_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return () =>
        httpResource<PackagesListDockerMigrationConflictingPackagesForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/docker/conflicts`,
          }),
        );
    },
  };
}
