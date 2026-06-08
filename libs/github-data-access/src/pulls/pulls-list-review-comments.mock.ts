import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_LIST_REVIEW_COMMENTS } from './pulls-list-review-comments.token';
import type { PullsListReviewCommentsResponse } from './pulls-list-review-comments.token';

export function providePullsListReviewCommentsMock(
  initialBehavior?: ProviderInitialBehavior<PullsListReviewCommentsResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_LIST_REVIEW_COMMENTS,
    'PULLS_LIST_REVIEW_COMMENTS',
    initialBehavior,
  );
}
