import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_RECEIVED_EVENTS_FOR_USER } from './activity-list-received-events-for-user.token';
import type { ActivityListReceivedEventsForUserResponse } from './activity-list-received-events-for-user.token';

export function provideActivityListReceivedEventsForUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListReceivedEventsForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_RECEIVED_EVENTS_FOR_USER,
    'ACTIVITY_LIST_RECEIVED_EVENTS_FOR_USER',
    initialBehavior,
  );
}
