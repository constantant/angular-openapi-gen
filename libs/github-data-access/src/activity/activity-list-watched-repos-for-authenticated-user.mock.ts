import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_WATCHED_REPOS_FOR_AUTHENTICATED_USER } from './activity-list-watched-repos-for-authenticated-user.token';
import type { ActivityListWatchedReposForAuthenticatedUserResponse } from './activity-list-watched-repos-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-watched-repos-for-authenticated-user',
  path: '/user/subscriptions',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListWatchedReposForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListWatchedReposForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_WATCHED_REPOS_FOR_AUTHENTICATED_USER,
    'ACTIVITY_LIST_WATCHED_REPOS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
