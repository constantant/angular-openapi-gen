import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { BILLING_DELETE_BUDGET_ORG } from './billing-delete-budget-org.token';
import type { BillingDeleteBudgetOrgResponse } from './billing-delete-budget-org.token';

export function provideBillingDeleteBudgetOrgMock(
  initialBehavior?: ProviderInitialBehavior<BillingDeleteBudgetOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_DELETE_BUDGET_ORG,
    'BILLING_DELETE_BUDGET_ORG',
    initialBehavior,
  );
}
