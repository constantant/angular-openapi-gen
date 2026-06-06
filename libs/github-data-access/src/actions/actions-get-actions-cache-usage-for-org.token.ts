import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetActionsCacheUsageForOrgResponse =
  paths['/orgs/{org}/actions/cache/usage']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ACTIONS_CACHE_USAGE_FOR_ORG = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<ActionsGetActionsCacheUsageForOrgResponse>
  >
>('ACTIONS_GET_ACTIONS_CACHE_USAGE_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<ActionsGetActionsCacheUsageForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/actions/cache/usage`,
      }));
  },
});
