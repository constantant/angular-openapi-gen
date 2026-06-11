import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SEARCH_CODE } from './search-code.token';
import type { SearchCodeResponse } from './search-code.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'search/code',
  path: '/search/code',
  method: 'get',
  tag: 'search',
};

export function provideSearchCodeMock(
  initialBehavior?: ProviderInitialBehavior<SearchCodeResponse>,
): FactoryProvider {
  return provideMockResource(
    SEARCH_CODE,
    'SEARCH_CODE',
    initialBehavior,
    _meta,
  );
}
