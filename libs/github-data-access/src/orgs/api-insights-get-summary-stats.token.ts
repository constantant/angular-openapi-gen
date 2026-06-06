import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ApiInsightsGetSummaryStatsParams =
  paths['/orgs/{org}/insights/api/summary-stats']['get']['parameters']['query'];

export type ApiInsightsGetSummaryStatsResponse =
  paths['/orgs/{org}/insights/api/summary-stats']['get']['responses']['200']['content']['application/json'];

export const API_INSIGHTS_GET_SUMMARY_STATS = new InjectionToken<
  (
    org: string,
    params?:
      | ApiInsightsGetSummaryStatsParams
      | (() => ApiInsightsGetSummaryStatsParams | undefined),
  ) => ReturnType<typeof httpResource<ApiInsightsGetSummaryStatsResponse>>
>('API_INSIGHTS_GET_SUMMARY_STATS');

export function provideApiInsightsGetSummaryStats(): FactoryProvider {
  return {
    provide: API_INSIGHTS_GET_SUMMARY_STATS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ApiInsightsGetSummaryStatsParams
          | (() => ApiInsightsGetSummaryStatsParams | undefined),
      ) =>
        httpResource<ApiInsightsGetSummaryStatsResponse>(() => ({
          url: `${base}/orgs/${org}/insights/api/summary-stats`,
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
