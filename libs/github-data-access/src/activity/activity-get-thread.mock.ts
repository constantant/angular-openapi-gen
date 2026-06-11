import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_GET_THREAD } from './activity-get-thread.token';
import type { ActivityGetThreadResponse } from './activity-get-thread.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/get-thread',
  path: '/notifications/threads/{thread_id}',
  method: 'get',
  tag: 'activity',
};

export function provideActivityGetThreadMock(
  initialBehavior?: ProviderInitialBehavior<ActivityGetThreadResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_GET_THREAD,
    'ACTIVITY_GET_THREAD',
    initialBehavior,
    _meta,
  );
}
