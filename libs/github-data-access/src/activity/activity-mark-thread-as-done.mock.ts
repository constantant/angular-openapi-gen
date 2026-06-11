import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_MARK_THREAD_AS_DONE } from './activity-mark-thread-as-done.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/mark-thread-as-done',
  path: '/notifications/threads/{thread_id}',
  method: 'delete',
  tag: 'activity',
};

export function provideActivityMarkThreadAsDoneMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_MARK_THREAD_AS_DONE,
    'ACTIVITY_MARK_THREAD_AS_DONE',
    initialBehavior,
    _meta,
  );
}
