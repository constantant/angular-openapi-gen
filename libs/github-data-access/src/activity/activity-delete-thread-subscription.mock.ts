import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_DELETE_THREAD_SUBSCRIPTION } from './activity-delete-thread-subscription.token';

export function provideActivityDeleteThreadSubscriptionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_DELETE_THREAD_SUBSCRIPTION,
    'ACTIVITY_DELETE_THREAD_SUBSCRIPTION',
    initialBehavior,
  );
}
