import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingGetGithubBillingAiCreditUsageReportOrgParams =
  paths['/organizations/{org}/settings/billing/ai_credit/usage']['get']['parameters']['query'];

export type BillingGetGithubBillingAiCreditUsageReportOrgResponse =
  paths['/organizations/{org}/settings/billing/ai_credit/usage']['get']['responses']['200']['content']['application/json'];

export const BILLING_GET_GITHUB_BILLING_AI_CREDIT_USAGE_REPORT_ORG =
  new InjectionToken<
    (
      org: string,
      params?:
        | BillingGetGithubBillingAiCreditUsageReportOrgParams
        | (() =>
            | BillingGetGithubBillingAiCreditUsageReportOrgParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<BillingGetGithubBillingAiCreditUsageReportOrgResponse>
    >
  >('BILLING_GET_GITHUB_BILLING_AI_CREDIT_USAGE_REPORT_ORG');

export function provideBillingGetGithubBillingAiCreditUsageReportOrg(): FactoryProvider {
  return {
    provide: BILLING_GET_GITHUB_BILLING_AI_CREDIT_USAGE_REPORT_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | BillingGetGithubBillingAiCreditUsageReportOrgParams
          | (() =>
              | BillingGetGithubBillingAiCreditUsageReportOrgParams
              | undefined),
      ) =>
        httpResource<BillingGetGithubBillingAiCreditUsageReportOrgResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/organizations/${org}/settings/billing/ai_credit/usage`,
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
