import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_RECEIVED_PUBLIC_EVENTS_FOR_USER } from './activity-list-received-public-events-for-user.token';
import type { ActivityListReceivedPublicEventsForUserResponse } from './activity-list-received-public-events-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-received-public-events-for-user',
  path: '/users/{username}/received_events/public',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListReceivedPublicEventsForUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListReceivedPublicEventsForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_RECEIVED_PUBLIC_EVENTS_FOR_USER,
    'ACTIVITY_LIST_RECEIVED_PUBLIC_EVENTS_FOR_USER',
    initialBehavior,
    _meta,
  );
}
