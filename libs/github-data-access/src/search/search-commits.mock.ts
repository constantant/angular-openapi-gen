import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SEARCH_COMMITS } from './search-commits.token';
import type { SearchCommitsResponse } from './search-commits.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'search/commits',
  path: '/search/commits',
  method: 'get',
  tag: 'search',
};

export function provideSearchCommitsMock(
  initialBehavior?: ProviderInitialBehavior<SearchCommitsResponse>,
): FactoryProvider {
  return provideMockResource(
    SEARCH_COMMITS,
    'SEARCH_COMMITS',
    initialBehavior,
    _meta,
  );
}
