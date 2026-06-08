import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_CREATE_REPLY_FOR_REVIEW_COMMENT } from './pulls-create-reply-for-review-comment.token';
import type { PullsCreateReplyForReviewCommentResponse } from './pulls-create-reply-for-review-comment.token';

export function providePullsCreateReplyForReviewCommentMock(
  initialBehavior?: ProviderInitialBehavior<PullsCreateReplyForReviewCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_CREATE_REPLY_FOR_REVIEW_COMMENT,
    'PULLS_CREATE_REPLY_FOR_REVIEW_COMMENT',
    initialBehavior,
  );
}
