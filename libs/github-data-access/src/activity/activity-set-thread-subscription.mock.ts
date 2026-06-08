import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_SET_THREAD_SUBSCRIPTION } from './activity-set-thread-subscription.token';
import type { ActivitySetThreadSubscriptionResponse } from './activity-set-thread-subscription.token';

export function provideActivitySetThreadSubscriptionMock(
  initialBehavior?: ProviderInitialBehavior<ActivitySetThreadSubscriptionResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_SET_THREAD_SUBSCRIPTION,
    'ACTIVITY_SET_THREAD_SUBSCRIPTION',
    initialBehavior,
  );
}
