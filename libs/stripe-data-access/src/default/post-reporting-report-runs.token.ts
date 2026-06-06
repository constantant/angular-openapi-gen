import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostReportingReportRunsBody = NonNullable<
  paths['/v1/reporting/report_runs']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostReportingReportRunsResponse =
  paths['/v1/reporting/report_runs']['post']['responses']['200']['content']['application/json'];

export const POST_REPORTING_REPORT_RUNS = new InjectionToken<
  (
    body: PostReportingReportRunsBody | Signal<PostReportingReportRunsBody>,
  ) => ReturnType<typeof httpResource<PostReportingReportRunsResponse>>
>('POST_REPORTING_REPORT_RUNS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostReportingReportRunsBody | Signal<PostReportingReportRunsBody>,
    ) =>
      httpResource<PostReportingReportRunsResponse>(() => ({
        url: `${base}/v1/reporting/report_runs`,
        method: 'POST',
        body,
      }));
  },
});
