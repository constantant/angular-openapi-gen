import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsListReposForAuthenticatedUserParams =
  paths['/user/migrations/{migration_id}/repositories']['get']['parameters']['query'];

export type MigrationsListReposForAuthenticatedUserResponse =
  paths['/user/migrations/{migration_id}/repositories']['get']['responses']['200']['content']['application/json'];

export const MIGRATIONS_LIST_REPOS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    migrationId: string,
    params?:
      | MigrationsListReposForAuthenticatedUserParams
      | (() => MigrationsListReposForAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<MigrationsListReposForAuthenticatedUserResponse>
  >
>('MIGRATIONS_LIST_REPOS_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      migrationId: string,
      params?:
        | MigrationsListReposForAuthenticatedUserParams
        | (() => MigrationsListReposForAuthenticatedUserParams | undefined),
    ) =>
      httpResource<MigrationsListReposForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/migrations/${migrationId}/repositories`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
