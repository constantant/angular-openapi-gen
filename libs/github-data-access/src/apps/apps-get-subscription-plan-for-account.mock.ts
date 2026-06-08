import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_GET_SUBSCRIPTION_PLAN_FOR_ACCOUNT } from './apps-get-subscription-plan-for-account.token';
import type { AppsGetSubscriptionPlanForAccountResponse } from './apps-get-subscription-plan-for-account.token';

export function provideAppsGetSubscriptionPlanForAccountMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetSubscriptionPlanForAccountResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_SUBSCRIPTION_PLAN_FOR_ACCOUNT,
    'APPS_GET_SUBSCRIPTION_PLAN_FOR_ACCOUNT',
    initialBehavior,
  );
}
