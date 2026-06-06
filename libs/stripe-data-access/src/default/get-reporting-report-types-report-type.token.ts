import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetReportingReportTypesReportTypeParams =
  paths['/v1/reporting/report_types/{report_type}']['get']['parameters']['query'];

export type GetReportingReportTypesReportTypeResponse =
  paths['/v1/reporting/report_types/{report_type}']['get']['responses']['200']['content']['application/json'];

export const GET_REPORTING_REPORT_TYPES_REPORT_TYPE = new InjectionToken<
  (
    reportType: string,
    params?:
      | GetReportingReportTypesReportTypeParams
      | (() => GetReportingReportTypesReportTypeParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetReportingReportTypesReportTypeResponse>
  >
>('GET_REPORTING_REPORT_TYPES_REPORT_TYPE');

export function provideGetReportingReportTypesReportType(): FactoryProvider {
  return {
    provide: GET_REPORTING_REPORT_TYPES_REPORT_TYPE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reportType: string,
        params?:
          | GetReportingReportTypesReportTypeParams
          | (() => GetReportingReportTypesReportTypeParams | undefined),
      ) =>
        httpResource<GetReportingReportTypesReportTypeResponse>(() => ({
          url: `${base}/v1/reporting/report_types/${reportType}`,
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
