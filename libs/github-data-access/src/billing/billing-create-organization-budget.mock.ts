import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { BILLING_CREATE_ORGANIZATION_BUDGET } from './billing-create-organization-budget.token';
import type { BillingCreateOrganizationBudgetResponse } from './billing-create-organization-budget.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'billing/create-organization-budget',
  path: '/organizations/{org}/settings/billing/budgets',
  method: 'post',
  tag: 'billing',
};

export function provideBillingCreateOrganizationBudgetMock(
  initialBehavior?: ProviderInitialBehavior<BillingCreateOrganizationBudgetResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_CREATE_ORGANIZATION_BUDGET,
    'BILLING_CREATE_ORGANIZATION_BUDGET',
    initialBehavior,
    _meta,
  );
}
