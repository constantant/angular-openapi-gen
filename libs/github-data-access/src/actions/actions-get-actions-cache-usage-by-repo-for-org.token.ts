import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetActionsCacheUsageByRepoForOrgParams =
  paths['/orgs/{org}/actions/cache/usage-by-repository']['get']['parameters']['query'];

export type ActionsGetActionsCacheUsageByRepoForOrgResponse =
  paths['/orgs/{org}/actions/cache/usage-by-repository']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ACTIONS_CACHE_USAGE_BY_REPO_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      params?:
        | ActionsGetActionsCacheUsageByRepoForOrgParams
        | (() => ActionsGetActionsCacheUsageByRepoForOrgParams | undefined),
    ) => ReturnType<
      typeof httpResource<ActionsGetActionsCacheUsageByRepoForOrgResponse>
    >
  >('ACTIONS_GET_ACTIONS_CACHE_USAGE_BY_REPO_FOR_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ActionsGetActionsCacheUsageByRepoForOrgParams
          | (() => ActionsGetActionsCacheUsageByRepoForOrgParams | undefined),
      ) =>
        httpResource<ActionsGetActionsCacheUsageByRepoForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/cache/usage-by-repository`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  });
