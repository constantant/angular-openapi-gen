import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ApiInsightsGetSummaryStatsByUserParams =
  paths['/orgs/{org}/insights/api/summary-stats/users/{user_id}']['get']['parameters']['query'];

export type ApiInsightsGetSummaryStatsByUserResponse =
  paths['/orgs/{org}/insights/api/summary-stats/users/{user_id}']['get']['responses']['200']['content']['application/json'];

export const API_INSIGHTS_GET_SUMMARY_STATS_BY_USER = new InjectionToken<
  (
    org: string,
    userId: string,
    params?:
      | ApiInsightsGetSummaryStatsByUserParams
      | (() => ApiInsightsGetSummaryStatsByUserParams | undefined),
  ) => ReturnType<typeof httpResource<ApiInsightsGetSummaryStatsByUserResponse>>
>('API_INSIGHTS_GET_SUMMARY_STATS_BY_USER');

export function provideApiInsightsGetSummaryStatsByUser(): FactoryProvider {
  return {
    provide: API_INSIGHTS_GET_SUMMARY_STATS_BY_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        userId: string,
        params?:
          | ApiInsightsGetSummaryStatsByUserParams
          | (() => ApiInsightsGetSummaryStatsByUserParams | undefined),
      ) =>
        httpResource<ApiInsightsGetSummaryStatsByUserResponse>(() => ({
          url: `${base}/orgs/${org}/insights/api/summary-stats/users/${userId}`,
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
