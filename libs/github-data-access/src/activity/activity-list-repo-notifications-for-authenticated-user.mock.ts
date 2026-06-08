import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_REPO_NOTIFICATIONS_FOR_AUTHENTICATED_USER } from './activity-list-repo-notifications-for-authenticated-user.token';
import type { ActivityListRepoNotificationsForAuthenticatedUserResponse } from './activity-list-repo-notifications-for-authenticated-user.token';

export function provideActivityListRepoNotificationsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListRepoNotificationsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_REPO_NOTIFICATIONS_FOR_AUTHENTICATED_USER,
    'ACTIVITY_LIST_REPO_NOTIFICATIONS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
