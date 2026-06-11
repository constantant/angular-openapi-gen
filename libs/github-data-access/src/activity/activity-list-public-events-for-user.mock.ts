import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_PUBLIC_EVENTS_FOR_USER } from './activity-list-public-events-for-user.token';
import type { ActivityListPublicEventsForUserResponse } from './activity-list-public-events-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-public-events-for-user',
  path: '/users/{username}/events/public',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListPublicEventsForUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListPublicEventsForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_PUBLIC_EVENTS_FOR_USER,
    'ACTIVITY_LIST_PUBLIC_EVENTS_FOR_USER',
    initialBehavior,
    _meta,
  );
}
