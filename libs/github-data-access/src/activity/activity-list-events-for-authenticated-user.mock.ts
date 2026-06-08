import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_EVENTS_FOR_AUTHENTICATED_USER } from './activity-list-events-for-authenticated-user.token';
import type { ActivityListEventsForAuthenticatedUserResponse } from './activity-list-events-for-authenticated-user.token';

export function provideActivityListEventsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListEventsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_EVENTS_FOR_AUTHENTICATED_USER,
    'ACTIVITY_LIST_EVENTS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
