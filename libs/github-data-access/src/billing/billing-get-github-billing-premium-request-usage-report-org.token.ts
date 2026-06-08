import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingGetGithubBillingPremiumRequestUsageReportOrgParams =
  paths['/organizations/{org}/settings/billing/premium_request/usage']['get']['parameters']['query'];

export type BillingGetGithubBillingPremiumRequestUsageReportOrgResponse =
  paths['/organizations/{org}/settings/billing/premium_request/usage']['get']['responses']['200']['content']['application/json'];

export const BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_ORG =
  new InjectionToken<
    (
      org: string,
      params?:
        | BillingGetGithubBillingPremiumRequestUsageReportOrgParams
        | (() =>
            | BillingGetGithubBillingPremiumRequestUsageReportOrgParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<BillingGetGithubBillingPremiumRequestUsageReportOrgResponse>
    >
  >('BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_ORG');

export function provideBillingGetGithubBillingPremiumRequestUsageReportOrg(): FactoryProvider {
  return {
    provide: BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | BillingGetGithubBillingPremiumRequestUsageReportOrgParams
          | (() =>
              | BillingGetGithubBillingPremiumRequestUsageReportOrgParams
              | undefined),
      ) =>
        httpResource<BillingGetGithubBillingPremiumRequestUsageReportOrgResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/organizations/${org}/settings/billing/premium_request/usage`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
        );
    },
  };
}
