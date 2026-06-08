import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_DELETE_PENDING_REVIEW } from './pulls-delete-pending-review.token';
import type { PullsDeletePendingReviewResponse } from './pulls-delete-pending-review.token';

export function providePullsDeletePendingReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsDeletePendingReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_DELETE_PENDING_REVIEW,
    'PULLS_DELETE_PENDING_REVIEW',
    initialBehavior,
  );
}
