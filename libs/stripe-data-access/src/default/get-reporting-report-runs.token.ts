import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetReportingReportRunsParams =
  paths['/v1/reporting/report_runs']['get']['parameters']['query'];

export type GetReportingReportRunsResponse =
  paths['/v1/reporting/report_runs']['get']['responses']['200']['content']['application/json'];

export const GET_REPORTING_REPORT_RUNS = new InjectionToken<
  (
    params?:
      | GetReportingReportRunsParams
      | (() => GetReportingReportRunsParams | undefined),
  ) => ReturnType<typeof httpResource<GetReportingReportRunsResponse>>
>('GET_REPORTING_REPORT_RUNS');

export function provideGetReportingReportRuns(): FactoryProvider {
  return {
    provide: GET_REPORTING_REPORT_RUNS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetReportingReportRunsParams
          | (() => GetReportingReportRunsParams | undefined),
      ) =>
        httpResource<GetReportingReportRunsResponse>(() => ({
          url: `${base}/v1/reporting/report_runs`,
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
