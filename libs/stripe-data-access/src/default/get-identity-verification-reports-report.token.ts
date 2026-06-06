import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIdentityVerificationReportsReportParams =
  paths['/v1/identity/verification_reports/{report}']['get']['parameters']['query'];

export type GetIdentityVerificationReportsReportResponse =
  paths['/v1/identity/verification_reports/{report}']['get']['responses']['200']['content']['application/json'];

export const GET_IDENTITY_VERIFICATION_REPORTS_REPORT = new InjectionToken<
  (
    report: string,
    params?:
      | GetIdentityVerificationReportsReportParams
      | (() => GetIdentityVerificationReportsReportParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetIdentityVerificationReportsReportResponse>
  >
>('GET_IDENTITY_VERIFICATION_REPORTS_REPORT');

export function provideGetIdentityVerificationReportsReport(): FactoryProvider {
  return {
    provide: GET_IDENTITY_VERIFICATION_REPORTS_REPORT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        report: string,
        params?:
          | GetIdentityVerificationReportsReportParams
          | (() => GetIdentityVerificationReportsReportParams | undefined),
      ) =>
        httpResource<GetIdentityVerificationReportsReportResponse>(() => ({
          url: `${base}/v1/identity/verification_reports/${report}`,
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
