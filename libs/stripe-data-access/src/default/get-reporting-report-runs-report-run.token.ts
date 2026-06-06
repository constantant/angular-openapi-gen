import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetReportingReportRunsReportRunParams =
  paths['/v1/reporting/report_runs/{report_run}']['get']['parameters']['query'];

export type GetReportingReportRunsReportRunResponse =
  paths['/v1/reporting/report_runs/{report_run}']['get']['responses']['200']['content']['application/json'];

export const GET_REPORTING_REPORT_RUNS_REPORT_RUN = new InjectionToken<
  (
    reportRun: string,
    params?:
      | GetReportingReportRunsReportRunParams
      | (() => GetReportingReportRunsReportRunParams | undefined),
  ) => ReturnType<typeof httpResource<GetReportingReportRunsReportRunResponse>>
>('GET_REPORTING_REPORT_RUNS_REPORT_RUN');

export function provideGetReportingReportRunsReportRun(): FactoryProvider {
  return {
    provide: GET_REPORTING_REPORT_RUNS_REPORT_RUN,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reportRun: string,
        params?:
          | GetReportingReportRunsReportRunParams
          | (() => GetReportingReportRunsReportRunParams | undefined),
      ) =>
        httpResource<GetReportingReportRunsReportRunResponse>(() => ({
          url: `${base}/v1/reporting/report_runs/${reportRun}`,
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
