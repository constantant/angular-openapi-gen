import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { BILLING_UPDATE_BUDGET_ORG } from './billing-update-budget-org.token';
import type { BillingUpdateBudgetOrgResponse } from './billing-update-budget-org.token';

export function provideBillingUpdateBudgetOrgMock(
  initialBehavior?: ProviderInitialBehavior<BillingUpdateBudgetOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_UPDATE_BUDGET_ORG,
    'BILLING_UPDATE_BUDGET_ORG',
    initialBehavior,
  );
}
