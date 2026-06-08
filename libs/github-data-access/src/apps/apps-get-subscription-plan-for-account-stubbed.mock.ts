import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_GET_SUBSCRIPTION_PLAN_FOR_ACCOUNT_STUBBED } from './apps-get-subscription-plan-for-account-stubbed.token';
import type { AppsGetSubscriptionPlanForAccountStubbedResponse } from './apps-get-subscription-plan-for-account-stubbed.token';

export function provideAppsGetSubscriptionPlanForAccountStubbedMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetSubscriptionPlanForAccountStubbedResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_SUBSCRIPTION_PLAN_FOR_ACCOUNT_STUBBED,
    'APPS_GET_SUBSCRIPTION_PLAN_FOR_ACCOUNT_STUBBED',
    initialBehavior,
  );
}
