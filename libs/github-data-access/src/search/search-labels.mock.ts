import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SEARCH_LABELS } from './search-labels.token';
import type { SearchLabelsResponse } from './search-labels.token';

export function provideSearchLabelsMock(
  initialBehavior?: ProviderInitialBehavior<SearchLabelsResponse>,
): FactoryProvider {
  return provideMockResource(SEARCH_LABELS, 'SEARCH_LABELS', initialBehavior);
}
