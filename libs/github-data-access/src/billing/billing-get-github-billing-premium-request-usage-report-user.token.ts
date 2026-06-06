import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingGetGithubBillingPremiumRequestUsageReportUserParams =
  paths['/users/{username}/settings/billing/premium_request/usage']['get']['parameters']['query'];

export type BillingGetGithubBillingPremiumRequestUsageReportUserResponse =
  paths['/users/{username}/settings/billing/premium_request/usage']['get']['responses']['200']['content']['application/json'];

export const BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_USER =
  new InjectionToken<
    (
      username: string,
      params?:
        | BillingGetGithubBillingPremiumRequestUsageReportUserParams
        | (() =>
            | BillingGetGithubBillingPremiumRequestUsageReportUserParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<BillingGetGithubBillingPremiumRequestUsageReportUserResponse>
    >
  >('BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_USER');

export function provideBillingGetGithubBillingPremiumRequestUsageReportUser(): FactoryProvider {
  return {
    provide: BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | BillingGetGithubBillingPremiumRequestUsageReportUserParams
          | (() =>
              | BillingGetGithubBillingPremiumRequestUsageReportUserParams
              | undefined),
      ) =>
        httpResource<BillingGetGithubBillingPremiumRequestUsageReportUserResponse>(
          () => ({
            url: `${base}/users/${username}/settings/billing/premium_request/usage`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
