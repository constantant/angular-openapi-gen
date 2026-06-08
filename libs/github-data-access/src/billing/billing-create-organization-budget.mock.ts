import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { BILLING_CREATE_ORGANIZATION_BUDGET } from './billing-create-organization-budget.token';
import type { BillingCreateOrganizationBudgetResponse } from './billing-create-organization-budget.token';

export function provideBillingCreateOrganizationBudgetMock(
  initialBehavior?: ProviderInitialBehavior<BillingCreateOrganizationBudgetResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_CREATE_ORGANIZATION_BUDGET,
    'BILLING_CREATE_ORGANIZATION_BUDGET',
    initialBehavior,
  );
}
