import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SEARCH_REPOS } from './search-repos.token';
import type { SearchReposResponse } from './search-repos.token';

export function provideSearchReposMock(
  initialBehavior?: ProviderInitialBehavior<SearchReposResponse>,
): FactoryProvider {
  return provideMockResource(SEARCH_REPOS, 'SEARCH_REPOS', initialBehavior);
}
