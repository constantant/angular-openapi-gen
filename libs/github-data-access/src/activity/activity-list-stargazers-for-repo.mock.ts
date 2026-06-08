import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_STARGAZERS_FOR_REPO } from './activity-list-stargazers-for-repo.token';
import type { ActivityListStargazersForRepoResponse } from './activity-list-stargazers-for-repo.token';

export function provideActivityListStargazersForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListStargazersForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_STARGAZERS_FOR_REPO,
    'ACTIVITY_LIST_STARGAZERS_FOR_REPO',
    initialBehavior,
  );
}
