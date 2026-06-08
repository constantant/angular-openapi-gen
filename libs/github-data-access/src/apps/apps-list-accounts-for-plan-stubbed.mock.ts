import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_LIST_ACCOUNTS_FOR_PLAN_STUBBED } from './apps-list-accounts-for-plan-stubbed.token';
import type { AppsListAccountsForPlanStubbedResponse } from './apps-list-accounts-for-plan-stubbed.token';

export function provideAppsListAccountsForPlanStubbedMock(
  initialBehavior?: ProviderInitialBehavior<AppsListAccountsForPlanStubbedResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_ACCOUNTS_FOR_PLAN_STUBBED,
    'APPS_LIST_ACCOUNTS_FOR_PLAN_STUBBED',
    initialBehavior,
  );
}
