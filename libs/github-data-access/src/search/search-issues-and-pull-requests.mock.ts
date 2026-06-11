import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SEARCH_ISSUES_AND_PULL_REQUESTS } from './search-issues-and-pull-requests.token';
import type { SearchIssuesAndPullRequestsResponse } from './search-issues-and-pull-requests.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'search/issues-and-pull-requests',
  path: '/search/issues',
  method: 'get',
  tag: 'search',
};

export function provideSearchIssuesAndPullRequestsMock(
  initialBehavior?: ProviderInitialBehavior<SearchIssuesAndPullRequestsResponse>,
): FactoryProvider {
  return provideMockResource(
    SEARCH_ISSUES_AND_PULL_REQUESTS,
    'SEARCH_ISSUES_AND_PULL_REQUESTS',
    initialBehavior,
    _meta,
  );
}
