import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SEARCH_COMMITS } from './search-commits.token';
import type { SearchCommitsResponse } from './search-commits.token';

export function provideSearchCommitsMock(
  initialBehavior?: ProviderInitialBehavior<SearchCommitsResponse>,
): FactoryProvider {
  return provideMockResource(SEARCH_COMMITS, 'SEARCH_COMMITS', initialBehavior);
}
