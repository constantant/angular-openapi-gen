import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_LIST_PLANS_STUBBED } from './apps-list-plans-stubbed.token';
import type { AppsListPlansStubbedResponse } from './apps-list-plans-stubbed.token';

export function provideAppsListPlansStubbedMock(
  initialBehavior?: ProviderInitialBehavior<AppsListPlansStubbedResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_PLANS_STUBBED,
    'APPS_LIST_PLANS_STUBBED',
    initialBehavior,
  );
}
