import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingGetGithubBillingUsageReportUserParams =
  paths['/users/{username}/settings/billing/usage']['get']['parameters']['query'];

export type BillingGetGithubBillingUsageReportUserResponse =
  paths['/users/{username}/settings/billing/usage']['get']['responses']['200']['content']['application/json'];

export const BILLING_GET_GITHUB_BILLING_USAGE_REPORT_USER = new InjectionToken<
  (
    username: string,
    params?:
      | BillingGetGithubBillingUsageReportUserParams
      | (() => BillingGetGithubBillingUsageReportUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<BillingGetGithubBillingUsageReportUserResponse>
  >
>('BILLING_GET_GITHUB_BILLING_USAGE_REPORT_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      username: string,
      params?:
        | BillingGetGithubBillingUsageReportUserParams
        | (() => BillingGetGithubBillingUsageReportUserParams | undefined),
    ) =>
      httpResource<BillingGetGithubBillingUsageReportUserResponse>(() => ({
        url: `${base}/users/${username}/settings/billing/usage`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
