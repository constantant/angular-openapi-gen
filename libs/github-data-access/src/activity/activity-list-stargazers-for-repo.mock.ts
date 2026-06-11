import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_STARGAZERS_FOR_REPO } from './activity-list-stargazers-for-repo.token';
import type { ActivityListStargazersForRepoResponse } from './activity-list-stargazers-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-stargazers-for-repo',
  path: '/repos/{owner}/{repo}/stargazers',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListStargazersForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListStargazersForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_STARGAZERS_FOR_REPO,
    'ACTIVITY_LIST_STARGAZERS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
