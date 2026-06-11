import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_MARK_THREAD_AS_READ } from './activity-mark-thread-as-read.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/mark-thread-as-read',
  path: '/notifications/threads/{thread_id}',
  method: 'patch',
  tag: 'activity',
};

export function provideActivityMarkThreadAsReadMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_MARK_THREAD_AS_READ,
    'ACTIVITY_MARK_THREAD_AS_READ',
    initialBehavior,
    _meta,
  );
}
