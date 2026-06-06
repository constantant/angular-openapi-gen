import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListForOrgParams =
  paths['/orgs/{org}/repos']['get']['parameters']['query'];

type ReposListForOrgResponse =
  paths['/orgs/{org}/repos']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?: ReposListForOrgParams,
  ) => ReturnType<typeof httpResource<ReposListForOrgResponse>>
>('REPOS_LIST_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, params?: ReposListForOrgParams) =>
      httpResource<ReposListForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/repos`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
