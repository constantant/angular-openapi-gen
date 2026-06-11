import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_REPO_NOTIFICATIONS_FOR_AUTHENTICATED_USER } from './activity-list-repo-notifications-for-authenticated-user.token';
import type { ActivityListRepoNotificationsForAuthenticatedUserResponse } from './activity-list-repo-notifications-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-repo-notifications-for-authenticated-user',
  path: '/repos/{owner}/{repo}/notifications',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListRepoNotificationsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListRepoNotificationsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_REPO_NOTIFICATIONS_FOR_AUTHENTICATED_USER,
    'ACTIVITY_LIST_REPO_NOTIFICATIONS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
