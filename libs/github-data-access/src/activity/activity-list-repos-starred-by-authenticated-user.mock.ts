import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_REPOS_STARRED_BY_AUTHENTICATED_USER } from './activity-list-repos-starred-by-authenticated-user.token';
import type { ActivityListReposStarredByAuthenticatedUserResponse } from './activity-list-repos-starred-by-authenticated-user.token';

export function provideActivityListReposStarredByAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListReposStarredByAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_REPOS_STARRED_BY_AUTHENTICATED_USER,
    'ACTIVITY_LIST_REPOS_STARRED_BY_AUTHENTICATED_USER',
    initialBehavior,
  );
}
