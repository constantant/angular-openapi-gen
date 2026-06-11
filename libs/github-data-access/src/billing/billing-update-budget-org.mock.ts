import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { BILLING_UPDATE_BUDGET_ORG } from './billing-update-budget-org.token';
import type { BillingUpdateBudgetOrgResponse } from './billing-update-budget-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'billing/update-budget-org',
  path: '/organizations/{org}/settings/billing/budgets/{budget_id}',
  method: 'patch',
  tag: 'billing',
};

export function provideBillingUpdateBudgetOrgMock(
  initialBehavior?: ProviderInitialBehavior<BillingUpdateBudgetOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_UPDATE_BUDGET_ORG,
    'BILLING_UPDATE_BUDGET_ORG',
    initialBehavior,
    _meta,
  );
}
