import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsListReposForOrgParams =
  paths['/orgs/{org}/migrations/{migration_id}/repositories']['get']['parameters']['query'];

export type MigrationsListReposForOrgResponse =
  paths['/orgs/{org}/migrations/{migration_id}/repositories']['get']['responses']['200']['content']['application/json'];

export const MIGRATIONS_LIST_REPOS_FOR_ORG = new InjectionToken<
  (
    org: string,
    migrationId: string,
    params?:
      | MigrationsListReposForOrgParams
      | (() => MigrationsListReposForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<MigrationsListReposForOrgResponse>>
>('MIGRATIONS_LIST_REPOS_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      migrationId: string,
      params?:
        | MigrationsListReposForOrgParams
        | (() => MigrationsListReposForOrgParams | undefined),
    ) =>
      httpResource<MigrationsListReposForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/migrations/${migrationId}/repositories`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
