import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { BILLING_GET_ALL_BUDGETS_ORG } from './billing-get-all-budgets-org.token';
import type { BillingGetAllBudgetsOrgResponse } from './billing-get-all-budgets-org.token';

export function provideBillingGetAllBudgetsOrgMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetAllBudgetsOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_ALL_BUDGETS_ORG,
    'BILLING_GET_ALL_BUDGETS_ORG',
    initialBehavior,
  );
}
