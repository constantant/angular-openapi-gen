import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingGetGithubBillingAiCreditUsageReportUserParams =
  paths['/users/{username}/settings/billing/ai_credit/usage']['get']['parameters']['query'];

export type BillingGetGithubBillingAiCreditUsageReportUserResponse =
  paths['/users/{username}/settings/billing/ai_credit/usage']['get']['responses']['200']['content']['application/json'];

export const BILLING_GET_GITHUB_BILLING_AI_CREDIT_USAGE_REPORT_USER =
  new InjectionToken<
    (
      username: string,
      params?:
        | BillingGetGithubBillingAiCreditUsageReportUserParams
        | (() =>
            | BillingGetGithubBillingAiCreditUsageReportUserParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<BillingGetGithubBillingAiCreditUsageReportUserResponse>
    >
  >('BILLING_GET_GITHUB_BILLING_AI_CREDIT_USAGE_REPORT_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | BillingGetGithubBillingAiCreditUsageReportUserParams
          | (() =>
              | BillingGetGithubBillingAiCreditUsageReportUserParams
              | undefined),
      ) =>
        httpResource<BillingGetGithubBillingAiCreditUsageReportUserResponse>(
          () => ({
            url: `${base}/users/${username}/settings/billing/ai_credit/usage`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
