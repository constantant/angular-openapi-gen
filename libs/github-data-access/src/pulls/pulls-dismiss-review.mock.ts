import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_DISMISS_REVIEW } from './pulls-dismiss-review.token';
import type { PullsDismissReviewResponse } from './pulls-dismiss-review.token';

export function providePullsDismissReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsDismissReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_DISMISS_REVIEW,
    'PULLS_DISMISS_REVIEW',
    initialBehavior,
  );
}
