import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_LIST_PLANS_STUBBED } from './apps-list-plans-stubbed.token';
import type { AppsListPlansStubbedResponse } from './apps-list-plans-stubbed.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/list-plans-stubbed',
  path: '/marketplace_listing/stubbed/plans',
  method: 'get',
  tag: 'apps',
};

export function provideAppsListPlansStubbedMock(
  initialBehavior?: ProviderInitialBehavior<AppsListPlansStubbedResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_PLANS_STUBBED,
    'APPS_LIST_PLANS_STUBBED',
    initialBehavior,
    _meta,
  );
}
