import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_GET_REVIEW_COMMENT } from './pulls-get-review-comment.token';
import type { PullsGetReviewCommentResponse } from './pulls-get-review-comment.token';

export function providePullsGetReviewCommentMock(
  initialBehavior?: ProviderInitialBehavior<PullsGetReviewCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_GET_REVIEW_COMMENT,
    'PULLS_GET_REVIEW_COMMENT',
    initialBehavior,
  );
}
