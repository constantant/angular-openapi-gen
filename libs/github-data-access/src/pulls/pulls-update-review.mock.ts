import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_UPDATE_REVIEW } from './pulls-update-review.token';
import type { PullsUpdateReviewResponse } from './pulls-update-review.token';

export function providePullsUpdateReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsUpdateReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_UPDATE_REVIEW,
    'PULLS_UPDATE_REVIEW',
    initialBehavior,
  );
}
