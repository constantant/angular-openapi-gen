import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_NOTIFICATIONS_FOR_AUTHENTICATED_USER } from './activity-list-notifications-for-authenticated-user.token';
import type { ActivityListNotificationsForAuthenticatedUserResponse } from './activity-list-notifications-for-authenticated-user.token';

export function provideActivityListNotificationsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListNotificationsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_NOTIFICATIONS_FOR_AUTHENTICATED_USER,
    'ACTIVITY_LIST_NOTIFICATIONS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
