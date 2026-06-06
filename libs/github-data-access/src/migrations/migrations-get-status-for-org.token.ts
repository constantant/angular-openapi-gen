import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsGetStatusForOrgParams =
  paths['/orgs/{org}/migrations/{migration_id}']['get']['parameters']['query'];

export type MigrationsGetStatusForOrgResponse =
  paths['/orgs/{org}/migrations/{migration_id}']['get']['responses']['200']['content']['application/json'];

export const MIGRATIONS_GET_STATUS_FOR_ORG = new InjectionToken<
  (
    org: string,
    migrationId: string,
    params?:
      | MigrationsGetStatusForOrgParams
      | (() => MigrationsGetStatusForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<MigrationsGetStatusForOrgResponse>>
>('MIGRATIONS_GET_STATUS_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      migrationId: string,
      params?:
        | MigrationsGetStatusForOrgParams
        | (() => MigrationsGetStatusForOrgParams | undefined),
    ) =>
      httpResource<MigrationsGetStatusForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/migrations/${migrationId}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
