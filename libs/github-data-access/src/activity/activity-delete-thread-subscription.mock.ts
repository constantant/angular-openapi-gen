import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_DELETE_THREAD_SUBSCRIPTION } from './activity-delete-thread-subscription.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/delete-thread-subscription',
  path: '/notifications/threads/{thread_id}/subscription',
  method: 'delete',
  tag: 'activity',
};

export function provideActivityDeleteThreadSubscriptionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_DELETE_THREAD_SUBSCRIPTION,
    'ACTIVITY_DELETE_THREAD_SUBSCRIPTION',
    initialBehavior,
    _meta,
  );
}
