import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsListForOrgParams =
  paths['/orgs/{org}/migrations']['get']['parameters']['query'];

export type MigrationsListForOrgResponse =
  paths['/orgs/{org}/migrations']['get']['responses']['200']['content']['application/json'];

export const MIGRATIONS_LIST_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | MigrationsListForOrgParams
      | (() => MigrationsListForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<MigrationsListForOrgResponse>>
>('MIGRATIONS_LIST_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | MigrationsListForOrgParams
        | (() => MigrationsListForOrgParams | undefined),
    ) =>
      httpResource<MigrationsListForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/migrations`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
