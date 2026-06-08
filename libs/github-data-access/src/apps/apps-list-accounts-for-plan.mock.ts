import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_LIST_ACCOUNTS_FOR_PLAN } from './apps-list-accounts-for-plan.token';
import type { AppsListAccountsForPlanResponse } from './apps-list-accounts-for-plan.token';

export function provideAppsListAccountsForPlanMock(
  initialBehavior?: ProviderInitialBehavior<AppsListAccountsForPlanResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_ACCOUNTS_FOR_PLAN,
    'APPS_LIST_ACCOUNTS_FOR_PLAN',
    initialBehavior,
  );
}
