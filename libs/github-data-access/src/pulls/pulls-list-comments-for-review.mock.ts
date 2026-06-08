import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_LIST_COMMENTS_FOR_REVIEW } from './pulls-list-comments-for-review.token';
import type { PullsListCommentsForReviewResponse } from './pulls-list-comments-for-review.token';

export function providePullsListCommentsForReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsListCommentsForReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_LIST_COMMENTS_FOR_REVIEW,
    'PULLS_LIST_COMMENTS_FOR_REVIEW',
    initialBehavior,
  );
}
