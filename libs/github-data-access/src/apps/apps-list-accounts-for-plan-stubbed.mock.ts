import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_LIST_ACCOUNTS_FOR_PLAN_STUBBED } from './apps-list-accounts-for-plan-stubbed.token';
import type { AppsListAccountsForPlanStubbedResponse } from './apps-list-accounts-for-plan-stubbed.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/list-accounts-for-plan-stubbed',
  path: '/marketplace_listing/stubbed/plans/{plan_id}/accounts',
  method: 'get',
  tag: 'apps',
};

export function provideAppsListAccountsForPlanStubbedMock(
  initialBehavior?: ProviderInitialBehavior<AppsListAccountsForPlanStubbedResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_ACCOUNTS_FOR_PLAN_STUBBED,
    'APPS_LIST_ACCOUNTS_FOR_PLAN_STUBBED',
    initialBehavior,
    _meta,
  );
}
