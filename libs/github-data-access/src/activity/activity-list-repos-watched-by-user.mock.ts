import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_REPOS_WATCHED_BY_USER } from './activity-list-repos-watched-by-user.token';
import type { ActivityListReposWatchedByUserResponse } from './activity-list-repos-watched-by-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-repos-watched-by-user',
  path: '/users/{username}/subscriptions',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListReposWatchedByUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListReposWatchedByUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_REPOS_WATCHED_BY_USER,
    'ACTIVITY_LIST_REPOS_WATCHED_BY_USER',
    initialBehavior,
    _meta,
  );
}
