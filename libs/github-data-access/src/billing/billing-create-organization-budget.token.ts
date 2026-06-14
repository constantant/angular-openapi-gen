import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type BillingCreateOrganizationBudgetBody = NonNullable<
  paths['/organizations/{org}/settings/billing/budgets']['post']['requestBody']
>['content']['application/json'];

export type BillingCreateOrganizationBudgetResponse =
  paths['/organizations/{org}/settings/billing/budgets']['post']['responses']['200']['content']['application/json'];

export const BILLING_CREATE_ORGANIZATION_BUDGET = new InjectionToken<
  (
    org: string,
    body:
      | BillingCreateOrganizationBudgetBody
      | Signal<BillingCreateOrganizationBudgetBody>,
  ) => ReturnType<typeof httpResource<BillingCreateOrganizationBudgetResponse>>
>('BILLING_CREATE_ORGANIZATION_BUDGET');

export function provideBillingCreateOrganizationBudget(): FactoryProvider {
  return {
    provide: BILLING_CREATE_ORGANIZATION_BUDGET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | BillingCreateOrganizationBudgetBody
          | Signal<BillingCreateOrganizationBudgetBody>,
      ) =>
        httpResource<BillingCreateOrganizationBudgetResponse>(() => ({
          url: `${base}/organizations/${org}/settings/billing/budgets`,
          method: 'POST',
          body,
        }));
    },
  };
}
