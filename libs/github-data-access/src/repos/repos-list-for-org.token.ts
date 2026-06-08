import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListForOrgParams =
  paths['/orgs/{org}/repos']['get']['parameters']['query'];

export type ReposListForOrgResponse =
  paths['/orgs/{org}/repos']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?: ReposListForOrgParams | (() => ReposListForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListForOrgResponse>>
>('REPOS_LIST_FOR_ORG');

export function provideReposListForOrg(): FactoryProvider {
  return {
    provide: REPOS_LIST_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ReposListForOrgParams
          | (() => ReposListForOrgParams | undefined),
      ) =>
        httpResource<ReposListForOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/repos`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
