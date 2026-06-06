import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingGetGithubBillingUsageSummaryReportUserParams =
  paths['/users/{username}/settings/billing/usage/summary']['get']['parameters']['query'];

export type BillingGetGithubBillingUsageSummaryReportUserResponse =
  paths['/users/{username}/settings/billing/usage/summary']['get']['responses']['200']['content']['application/json'];

export const BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_USER =
  new InjectionToken<
    (
      username: string,
      params?:
        | BillingGetGithubBillingUsageSummaryReportUserParams
        | (() =>
            | BillingGetGithubBillingUsageSummaryReportUserParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<BillingGetGithubBillingUsageSummaryReportUserResponse>
    >
  >('BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | BillingGetGithubBillingUsageSummaryReportUserParams
          | (() =>
              | BillingGetGithubBillingUsageSummaryReportUserParams
              | undefined),
      ) =>
        httpResource<BillingGetGithubBillingUsageSummaryReportUserResponse>(
          () => ({
            url: `${base}/users/${username}/settings/billing/usage/summary`,
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
