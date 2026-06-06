import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ApiInsightsGetTimeStatsByUserParams =
  paths['/orgs/{org}/insights/api/time-stats/users/{user_id}']['get']['parameters']['query'];

export type ApiInsightsGetTimeStatsByUserResponse =
  paths['/orgs/{org}/insights/api/time-stats/users/{user_id}']['get']['responses']['200']['content']['application/json'];

export const API_INSIGHTS_GET_TIME_STATS_BY_USER = new InjectionToken<
  (
    org: string,
    userId: string,
    params?:
      | ApiInsightsGetTimeStatsByUserParams
      | (() => ApiInsightsGetTimeStatsByUserParams | undefined),
  ) => ReturnType<typeof httpResource<ApiInsightsGetTimeStatsByUserResponse>>
>('API_INSIGHTS_GET_TIME_STATS_BY_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      userId: string,
      params?:
        | ApiInsightsGetTimeStatsByUserParams
        | (() => ApiInsightsGetTimeStatsByUserParams | undefined),
    ) =>
      httpResource<ApiInsightsGetTimeStatsByUserResponse>(() => ({
        url: `${base}/orgs/${org}/insights/api/time-stats/users/${userId}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
