import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingUpdateBudgetOrgBody = NonNullable<
  paths['/organizations/{org}/settings/billing/budgets/{budget_id}']['patch']['requestBody']
>['content']['application/json'];

export type BillingUpdateBudgetOrgResponse =
  paths['/organizations/{org}/settings/billing/budgets/{budget_id}']['patch']['responses']['200']['content']['application/json'];

export const BILLING_UPDATE_BUDGET_ORG = new InjectionToken<
  (
    org: string,
    budgetId: string,
    body: BillingUpdateBudgetOrgBody | Signal<BillingUpdateBudgetOrgBody>,
  ) => ReturnType<typeof httpResource<BillingUpdateBudgetOrgResponse>>
>('BILLING_UPDATE_BUDGET_ORG');

export function provideBillingUpdateBudgetOrg(): FactoryProvider {
  return {
    provide: BILLING_UPDATE_BUDGET_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        budgetId: string,
        body: BillingUpdateBudgetOrgBody | Signal<BillingUpdateBudgetOrgBody>,
      ) =>
        httpResource<BillingUpdateBudgetOrgResponse>(() => ({
          url: `${base}/organizations/${org}/settings/billing/budgets/${budgetId}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
