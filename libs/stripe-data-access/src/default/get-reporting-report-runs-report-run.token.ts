import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetReportingReportRunsReportRunParams =
  paths['/v1/reporting/report_runs/{report_run}']['get']['parameters']['query'];

type GetReportingReportRunsReportRunResponse =
  paths['/v1/reporting/report_runs/{report_run}']['get']['responses']['200']['content']['application/json'];

export const GET_REPORTING_REPORT_RUNS_REPORT_RUN = new InjectionToken<
  (
    report_run: string,
    params?: GetReportingReportRunsReportRunParams,
  ) => ReturnType<typeof httpResource<GetReportingReportRunsReportRunResponse>>
>('GET_REPORTING_REPORT_RUNS_REPORT_RUN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      report_run: string,
      params?: GetReportingReportRunsReportRunParams,
    ) =>
      httpResource<GetReportingReportRunsReportRunResponse>(() => ({
        url: `${base}/v1/reporting/report_runs/${report_run}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
