import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('BILLING_GET_ALL_BUDGETS_ORG');

export function provideBillingGetAllBudgetsOrg(): FactoryProvider {
  return {
    provide: BILLING_GET_ALL_BUDGETS_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | BillingGetAllBudgetsOrgParams
          | (() => BillingGetAllBudgetsOrgParams | undefined),
      ) =>
        httpResource<BillingGetAllBudgetsOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/organizations/${org}/settings/billing/budgets`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
