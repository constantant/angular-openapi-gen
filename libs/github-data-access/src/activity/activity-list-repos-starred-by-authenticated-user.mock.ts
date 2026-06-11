import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_REPOS_STARRED_BY_AUTHENTICATED_USER } from './activity-list-repos-starred-by-authenticated-user.token';
import type { ActivityListReposStarredByAuthenticatedUserResponse } from './activity-list-repos-starred-by-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-repos-starred-by-authenticated-user',
  path: '/user/starred',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListReposStarredByAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListReposStarredByAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_REPOS_STARRED_BY_AUTHENTICATED_USER,
    'ACTIVITY_LIST_REPOS_STARRED_BY_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
