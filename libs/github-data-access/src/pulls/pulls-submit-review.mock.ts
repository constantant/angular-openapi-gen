import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_SUBMIT_REVIEW } from './pulls-submit-review.token';
import type { PullsSubmitReviewResponse } from './pulls-submit-review.token';

export function providePullsSubmitReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsSubmitReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_SUBMIT_REVIEW,
    'PULLS_SUBMIT_REVIEW',
    initialBehavior,
  );
}
