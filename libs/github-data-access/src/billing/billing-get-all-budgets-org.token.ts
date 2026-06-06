import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingGetAllBudgetsOrgParams =
  paths['/organizations/{org}/settings/billing/budgets']['get']['parameters']['query'];

export type BillingGetAllBudgetsOrgResponse =
  paths['/organizations/{org}/settings/billing/budgets']['get']['responses']['200']['content']['application/json'];

export const BILLING_GET_ALL_BUDGETS_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | BillingGetAllBudgetsOrgParams
      | (() => BillingGetAllBudgetsOrgParams | undefined),
  ) => ReturnType<typeof httpResource<BillingGetAllBudgetsOrgResponse>>
>('BILLING_GET_ALL_BUDGETS_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | BillingGetAllBudgetsOrgParams
        | (() => BillingGetAllBudgetsOrgParams | undefined),
    ) =>
      httpResource<BillingGetAllBudgetsOrgResponse>(() => ({
        url: `${base}/organizations/${org}/settings/billing/budgets`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
