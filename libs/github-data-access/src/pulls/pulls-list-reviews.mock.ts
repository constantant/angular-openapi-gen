import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_LIST_REVIEWS } from './pulls-list-reviews.token';
import type { PullsListReviewsResponse } from './pulls-list-reviews.token';

export function providePullsListReviewsMock(
  initialBehavior?: ProviderInitialBehavior<PullsListReviewsResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_LIST_REVIEWS,
    'PULLS_LIST_REVIEWS',
    initialBehavior,
  );
}
