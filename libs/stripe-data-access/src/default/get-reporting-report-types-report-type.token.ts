import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetReportingReportTypesReportTypeParams =
  paths['/v1/reporting/report_types/{report_type}']['get']['parameters']['query'];

type GetReportingReportTypesReportTypeResponse =
  paths['/v1/reporting/report_types/{report_type}']['get']['responses']['200']['content']['application/json'];

export const GET_REPORTING_REPORT_TYPES_REPORT_TYPE = new InjectionToken<
  (
    report_type: string,
    params?: GetReportingReportTypesReportTypeParams,
  ) => ReturnType<
    typeof httpResource<GetReportingReportTypesReportTypeResponse>
  >
>('GET_REPORTING_REPORT_TYPES_REPORT_TYPE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      report_type: string,
      params?: GetReportingReportTypesReportTypeParams,
    ) =>
      httpResource<GetReportingReportTypesReportTypeResponse>(() => ({
        url: `${base}/v1/reporting/report_types/${report_type}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
