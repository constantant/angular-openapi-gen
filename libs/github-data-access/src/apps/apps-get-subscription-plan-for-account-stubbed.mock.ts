import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_GET_SUBSCRIPTION_PLAN_FOR_ACCOUNT_STUBBED } from './apps-get-subscription-plan-for-account-stubbed.token';
import type { AppsGetSubscriptionPlanForAccountStubbedResponse } from './apps-get-subscription-plan-for-account-stubbed.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/get-subscription-plan-for-account-stubbed',
  path: '/marketplace_listing/stubbed/accounts/{account_id}',
  method: 'get',
  tag: 'apps',
};

export function provideAppsGetSubscriptionPlanForAccountStubbedMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetSubscriptionPlanForAccountStubbedResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_SUBSCRIPTION_PLAN_FOR_ACCOUNT_STUBBED,
    'APPS_GET_SUBSCRIPTION_PLAN_FOR_ACCOUNT_STUBBED',
    initialBehavior,
    _meta,
  );
}
