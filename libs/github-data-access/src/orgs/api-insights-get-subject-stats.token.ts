import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ApiInsightsGetSubjectStatsParams =
  paths['/orgs/{org}/insights/api/subject-stats']['get']['parameters']['query'];

export type ApiInsightsGetSubjectStatsResponse =
  paths['/orgs/{org}/insights/api/subject-stats']['get']['responses']['200']['content']['application/json'];

export const API_INSIGHTS_GET_SUBJECT_STATS = new InjectionToken<
  (
    org: string,
    params?:
      | ApiInsightsGetSubjectStatsParams
      | (() => ApiInsightsGetSubjectStatsParams | undefined),
  ) => ReturnType<typeof httpResource<ApiInsightsGetSubjectStatsResponse>>
>('API_INSIGHTS_GET_SUBJECT_STATS');

export function provideApiInsightsGetSubjectStats(): FactoryProvider {
  return {
    provide: API_INSIGHTS_GET_SUBJECT_STATS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ApiInsightsGetSubjectStatsParams
          | (() => ApiInsightsGetSubjectStatsParams | undefined),
      ) =>
        httpResource<ApiInsightsGetSubjectStatsResponse>(() => ({
          url: `${base}/orgs/${org}/insights/api/subject-stats`,
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
