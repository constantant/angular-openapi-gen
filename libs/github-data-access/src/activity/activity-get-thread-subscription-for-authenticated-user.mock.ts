import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_GET_THREAD_SUBSCRIPTION_FOR_AUTHENTICATED_USER } from './activity-get-thread-subscription-for-authenticated-user.token';
import type { ActivityGetThreadSubscriptionForAuthenticatedUserResponse } from './activity-get-thread-subscription-for-authenticated-user.token';

export function provideActivityGetThreadSubscriptionForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityGetThreadSubscriptionForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_GET_THREAD_SUBSCRIPTION_FOR_AUTHENTICATED_USER,
    'ACTIVITY_GET_THREAD_SUBSCRIPTION_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
