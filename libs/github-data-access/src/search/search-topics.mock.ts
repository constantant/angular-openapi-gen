import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SEARCH_TOPICS } from './search-topics.token';
import type { SearchTopicsResponse } from './search-topics.token';

export function provideSearchTopicsMock(
  initialBehavior?: ProviderInitialBehavior<SearchTopicsResponse>,
): FactoryProvider {
  return provideMockResource(SEARCH_TOPICS, 'SEARCH_TOPICS', initialBehavior);
}
