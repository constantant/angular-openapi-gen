import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetReportingReportTypesParams =
  paths['/v1/reporting/report_types']['get']['parameters']['query'];

export type GetReportingReportTypesResponse =
  paths['/v1/reporting/report_types']['get']['responses']['200']['content']['application/json'];

export const GET_REPORTING_REPORT_TYPES = new InjectionToken<
  (
    params?:
      | GetReportingReportTypesParams
      | (() => GetReportingReportTypesParams | undefined),
  ) => ReturnType<typeof httpResource<GetReportingReportTypesResponse>>
>('GET_REPORTING_REPORT_TYPES');

export function provideGetReportingReportTypes(): FactoryProvider {
  return {
    provide: GET_REPORTING_REPORT_TYPES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetReportingReportTypesParams
          | (() => GetReportingReportTypesParams | undefined),
      ) =>
        httpResource<GetReportingReportTypesResponse>(() => ({
          url: `${base}/v1/reporting/report_types`,
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
