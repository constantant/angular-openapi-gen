import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ApiInsightsGetTimeStatsParams =
  paths['/orgs/{org}/insights/api/time-stats']['get']['parameters']['query'];

export type ApiInsightsGetTimeStatsResponse =
  paths['/orgs/{org}/insights/api/time-stats']['get']['responses']['200']['content']['application/json'];

export const API_INSIGHTS_GET_TIME_STATS = new InjectionToken<
  (
    org: string,
    params?:
      | ApiInsightsGetTimeStatsParams
      | (() => ApiInsightsGetTimeStatsParams | undefined),
  ) => ReturnType<typeof httpResource<ApiInsightsGetTimeStatsResponse>>
>('API_INSIGHTS_GET_TIME_STATS');

export function provideApiInsightsGetTimeStats(): FactoryProvider {
  return {
    provide: API_INSIGHTS_GET_TIME_STATS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ApiInsightsGetTimeStatsParams
          | (() => ApiInsightsGetTimeStatsParams | undefined),
      ) =>
        httpResource<ApiInsightsGetTimeStatsResponse>(() => ({
          url: `${base}/orgs/${org}/insights/api/time-stats`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
