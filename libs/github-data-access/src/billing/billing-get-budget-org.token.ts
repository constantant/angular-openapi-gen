import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingGetBudgetOrgResponse =
  paths['/organizations/{org}/settings/billing/budgets/{budget_id}']['get']['responses']['200']['content']['application/json'];

export const BILLING_GET_BUDGET_ORG = new InjectionToken<
  (
    org: string,
    budgetId: string,
  ) => ReturnType<typeof httpResource<BillingGetBudgetOrgResponse>>
>('BILLING_GET_BUDGET_ORG');

export function provideBillingGetBudgetOrg(): FactoryProvider {
  return {
    provide: BILLING_GET_BUDGET_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, budgetId: string) =>
        httpResource<BillingGetBudgetOrgResponse>(() => ({
          url: `${base}/organizations/${org}/settings/billing/budgets/${budgetId}`,
        }));
    },
  };
}
