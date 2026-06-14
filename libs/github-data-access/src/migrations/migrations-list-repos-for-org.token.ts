import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('MIGRATIONS_LIST_REPOS_FOR_ORG');

export function provideMigrationsListReposForOrg(): FactoryProvider {
  return {
    provide: MIGRATIONS_LIST_REPOS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        migrationId: string,
        params?:
          | MigrationsListReposForOrgParams
          | (() => MigrationsListReposForOrgParams | undefined),
      ) =>
        httpResource<MigrationsListReposForOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/migrations/${migrationId}/repositories`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
