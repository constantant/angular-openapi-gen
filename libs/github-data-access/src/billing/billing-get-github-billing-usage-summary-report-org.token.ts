import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingGetGithubBillingUsageSummaryReportOrgParams =
  paths['/organizations/{org}/settings/billing/usage/summary']['get']['parameters']['query'];

export type BillingGetGithubBillingUsageSummaryReportOrgResponse =
  paths['/organizations/{org}/settings/billing/usage/summary']['get']['responses']['200']['content']['application/json'];

export const BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_ORG =
  new InjectionToken<
    (
      org: string,
      params?:
        | BillingGetGithubBillingUsageSummaryReportOrgParams
        | (() =>
            | BillingGetGithubBillingUsageSummaryReportOrgParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<BillingGetGithubBillingUsageSummaryReportOrgResponse>
    >
  >('BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_ORG');

export function provideBillingGetGithubBillingUsageSummaryReportOrg(): FactoryProvider {
  return {
    provide: BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | BillingGetGithubBillingUsageSummaryReportOrgParams
          | (() =>
              | BillingGetGithubBillingUsageSummaryReportOrgParams
              | undefined),
      ) =>
        httpResource<BillingGetGithubBillingUsageSummaryReportOrgResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/organizations/${org}/settings/billing/usage/summary`,
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
