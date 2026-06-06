import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIdentityVerificationReportsParams =
  paths['/v1/identity/verification_reports']['get']['parameters']['query'];

export type GetIdentityVerificationReportsResponse =
  paths['/v1/identity/verification_reports']['get']['responses']['200']['content']['application/json'];

export const GET_IDENTITY_VERIFICATION_REPORTS = new InjectionToken<
  (
    params?:
      | GetIdentityVerificationReportsParams
      | (() => GetIdentityVerificationReportsParams | undefined),
  ) => ReturnType<typeof httpResource<GetIdentityVerificationReportsResponse>>
>('GET_IDENTITY_VERIFICATION_REPORTS');

export function provideGetIdentityVerificationReports(): FactoryProvider {
  return {
    provide: GET_IDENTITY_VERIFICATION_REPORTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetIdentityVerificationReportsParams
          | (() => GetIdentityVerificationReportsParams | undefined),
      ) =>
        httpResource<GetIdentityVerificationReportsResponse>(() => ({
          url: `${base}/v1/identity/verification_reports`,
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
