import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { BILLING_GET_BUDGET_ORG } from './billing-get-budget-org.token';
import type { BillingGetBudgetOrgResponse } from './billing-get-budget-org.token';

export function provideBillingGetBudgetOrgMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetBudgetOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_BUDGET_ORG,
    'BILLING_GET_BUDGET_ORG',
    initialBehavior,
  );
}
