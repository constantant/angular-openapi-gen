import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_REPOS_STARRED_BY_USER } from './activity-list-repos-starred-by-user.token';
import type { ActivityListReposStarredByUserResponse } from './activity-list-repos-starred-by-user.token';

export function provideActivityListReposStarredByUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListReposStarredByUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_REPOS_STARRED_BY_USER,
    'ACTIVITY_LIST_REPOS_STARRED_BY_USER',
    initialBehavior,
  );
}
