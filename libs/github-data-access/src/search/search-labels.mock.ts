import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SEARCH_LABELS } from './search-labels.token';
import type { SearchLabelsResponse } from './search-labels.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'search/labels',
  path: '/search/labels',
  method: 'get',
  tag: 'search',
};

export function provideSearchLabelsMock(
  initialBehavior?: ProviderInitialBehavior<SearchLabelsResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    SEARCH_LABELS,
    'SEARCH_LABELS',
    initialBehavior,
    _meta,
    options,
  );
}
