import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetReportingReportRunsParams =
  paths['/v1/reporting/report_runs']['get']['parameters']['query'];

type GetReportingReportRunsResponse =
  paths['/v1/reporting/report_runs']['get']['responses']['200']['content']['application/json'];

export const GET_REPORTING_REPORT_RUNS = new InjectionToken<
  (
    params?: GetReportingReportRunsParams,
  ) => ReturnType<typeof httpResource<GetReportingReportRunsResponse>>
>('GET_REPORTING_REPORT_RUNS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetReportingReportRunsParams) =>
      httpResource<GetReportingReportRunsResponse>(() => ({
        url: `${base}/v1/reporting/report_runs`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
