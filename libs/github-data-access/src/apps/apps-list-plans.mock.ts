import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_LIST_PLANS } from './apps-list-plans.token';
import type { AppsListPlansResponse } from './apps-list-plans.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/list-plans',
  path: '/marketplace_listing/plans',
  method: 'get',
  tag: 'apps',
};

export function provideAppsListPlansMock(
  initialBehavior?: ProviderInitialBehavior<AppsListPlansResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_PLANS,
    'APPS_LIST_PLANS',
    initialBehavior,
    _meta,
  );
}
