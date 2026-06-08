import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_GET_REVIEW } from './pulls-get-review.token';
import type { PullsGetReviewResponse } from './pulls-get-review.token';

export function providePullsGetReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsGetReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_GET_REVIEW,
    'PULLS_GET_REVIEW',
    initialBehavior,
  );
}
