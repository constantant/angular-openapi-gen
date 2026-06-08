import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SEARCH_ISSUES_AND_PULL_REQUESTS } from './search-issues-and-pull-requests.token';
import type { SearchIssuesAndPullRequestsResponse } from './search-issues-and-pull-requests.token';

export function provideSearchIssuesAndPullRequestsMock(
  initialBehavior?: ProviderInitialBehavior<SearchIssuesAndPullRequestsResponse>,
): FactoryProvider {
  return provideMockResource(
    SEARCH_ISSUES_AND_PULL_REQUESTS,
    'SEARCH_ISSUES_AND_PULL_REQUESTS',
    initialBehavior,
  );
}
