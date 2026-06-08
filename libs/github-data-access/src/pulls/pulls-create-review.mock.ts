import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_CREATE_REVIEW } from './pulls-create-review.token';
import type { PullsCreateReviewResponse } from './pulls-create-review.token';

export function providePullsCreateReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsCreateReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_CREATE_REVIEW,
    'PULLS_CREATE_REVIEW',
    initialBehavior,
  );
}
