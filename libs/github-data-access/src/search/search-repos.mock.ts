import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SEARCH_REPOS } from './search-repos.token';
import type { SearchReposResponse } from './search-repos.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'search/repos',
  path: '/search/repositories',
  method: 'get',
  tag: 'search',
};

export function provideSearchReposMock(
  initialBehavior?: ProviderInitialBehavior<SearchReposResponse>,
): FactoryProvider {
  return provideMockResource(
    SEARCH_REPOS,
    'SEARCH_REPOS',
    initialBehavior,
    _meta,
  );
}
