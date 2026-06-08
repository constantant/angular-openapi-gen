import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_CREATE_FOR_PULL_REQUEST_REVIEW_COMMENT } from './reactions-create-for-pull-request-review-comment.token';
import type { ReactionsCreateForPullRequestReviewCommentResponse } from './reactions-create-for-pull-request-review-comment.token';

export function provideReactionsCreateForPullRequestReviewCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsCreateForPullRequestReviewCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_CREATE_FOR_PULL_REQUEST_REVIEW_COMMENT,
    'REACTIONS_CREATE_FOR_PULL_REQUEST_REVIEW_COMMENT',
    initialBehavior,
  );
}
