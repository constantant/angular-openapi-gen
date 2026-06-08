import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingGetGithubBillingUsageReportOrgParams =
  paths['/organizations/{org}/settings/billing/usage']['get']['parameters']['query'];

export type BillingGetGithubBillingUsageReportOrgResponse =
  paths['/organizations/{org}/settings/billing/usage']['get']['responses']['200']['content']['application/json'];

export const BILLING_GET_GITHUB_BILLING_USAGE_REPORT_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | BillingGetGithubBillingUsageReportOrgParams
      | (() => BillingGetGithubBillingUsageReportOrgParams | undefined),
  ) => ReturnType<
    typeof httpResource<BillingGetGithubBillingUsageReportOrgResponse>
  >
>('BILLING_GET_GITHUB_BILLING_USAGE_REPORT_ORG');

export function provideBillingGetGithubBillingUsageReportOrg(): FactoryProvider {
  return {
    provide: BILLING_GET_GITHUB_BILLING_USAGE_REPORT_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | BillingGetGithubBillingUsageReportOrgParams
          | (() => BillingGetGithubBillingUsageReportOrgParams | undefined),
      ) =>
        httpResource<BillingGetGithubBillingUsageReportOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/organizations/${org}/settings/billing/usage`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
