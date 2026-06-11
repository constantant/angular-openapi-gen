import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_CREATE_FOR_PULL_REQUEST_REVIEW_COMMENT } from './reactions-create-for-pull-request-review-comment.token';
import type { ReactionsCreateForPullRequestReviewCommentResponse } from './reactions-create-for-pull-request-review-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/create-for-pull-request-review-comment',
  path: '/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions',
  method: 'post',
  tag: 'reactions',
};

export function provideReactionsCreateForPullRequestReviewCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsCreateForPullRequestReviewCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_CREATE_FOR_PULL_REQUEST_REVIEW_COMMENT,
    'REACTIONS_CREATE_FOR_PULL_REQUEST_REVIEW_COMMENT',
    initialBehavior,
    _meta,
  );
}
