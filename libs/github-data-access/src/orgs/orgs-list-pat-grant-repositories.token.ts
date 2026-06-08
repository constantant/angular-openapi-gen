import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListPatGrantRepositoriesParams =
  paths['/orgs/{org}/personal-access-tokens/{pat_id}/repositories']['get']['parameters']['query'];

export type OrgsListPatGrantRepositoriesResponse =
  paths['/orgs/{org}/personal-access-tokens/{pat_id}/repositories']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_PAT_GRANT_REPOSITORIES = new InjectionToken<
  (
    org: string,
    patId: string,
    params?:
      | OrgsListPatGrantRepositoriesParams
      | (() => OrgsListPatGrantRepositoriesParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListPatGrantRepositoriesResponse>>
>('ORGS_LIST_PAT_GRANT_REPOSITORIES');

export function provideOrgsListPatGrantRepositories(): FactoryProvider {
  return {
    provide: ORGS_LIST_PAT_GRANT_REPOSITORIES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        patId: string,
        params?:
          | OrgsListPatGrantRepositoriesParams
          | (() => OrgsListPatGrantRepositoriesParams | undefined),
      ) =>
        httpResource<OrgsListPatGrantRepositoriesResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/personal-access-tokens/${patId}/repositories`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
