import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetReportingReportTypesParams =
  paths['/v1/reporting/report_types']['get']['parameters']['query'];

type GetReportingReportTypesResponse =
  paths['/v1/reporting/report_types']['get']['responses']['200']['content']['application/json'];

export const GET_REPORTING_REPORT_TYPES = new InjectionToken<
  (
    params?: GetReportingReportTypesParams,
  ) => ReturnType<typeof httpResource<GetReportingReportTypesResponse>>
>('GET_REPORTING_REPORT_TYPES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetReportingReportTypesParams) =>
      httpResource<GetReportingReportTypesResponse>(() => ({
        url: `${base}/v1/reporting/report_types`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
