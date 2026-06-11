import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_SET_THREAD_SUBSCRIPTION } from './activity-set-thread-subscription.token';
import type { ActivitySetThreadSubscriptionResponse } from './activity-set-thread-subscription.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/set-thread-subscription',
  path: '/notifications/threads/{thread_id}/subscription',
  method: 'put',
  tag: 'activity',
};

export function provideActivitySetThreadSubscriptionMock(
  initialBehavior?: ProviderInitialBehavior<ActivitySetThreadSubscriptionResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_SET_THREAD_SUBSCRIPTION,
    'ACTIVITY_SET_THREAD_SUBSCRIPTION',
    initialBehavior,
    _meta,
  );
}
