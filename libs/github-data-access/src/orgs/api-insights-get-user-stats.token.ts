import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ApiInsightsGetUserStatsParams =
  paths['/orgs/{org}/insights/api/user-stats/{user_id}']['get']['parameters']['query'];

export type ApiInsightsGetUserStatsResponse =
  paths['/orgs/{org}/insights/api/user-stats/{user_id}']['get']['responses']['200']['content']['application/json'];

export const API_INSIGHTS_GET_USER_STATS = new InjectionToken<
  (
    org: string,
    userId: string,
    params?:
      | ApiInsightsGetUserStatsParams
      | (() => ApiInsightsGetUserStatsParams | undefined),
  ) => ReturnType<typeof httpResource<ApiInsightsGetUserStatsResponse>>
>('API_INSIGHTS_GET_USER_STATS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      userId: string,
      params?:
        | ApiInsightsGetUserStatsParams
        | (() => ApiInsightsGetUserStatsParams | undefined),
    ) =>
      httpResource<ApiInsightsGetUserStatsResponse>(() => ({
        url: `${base}/orgs/${org}/insights/api/user-stats/${userId}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
