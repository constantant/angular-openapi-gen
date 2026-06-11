import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_LIST_FOR_PULL_REQUEST_REVIEW_COMMENT } from './reactions-list-for-pull-request-review-comment.token';
import type { ReactionsListForPullRequestReviewCommentResponse } from './reactions-list-for-pull-request-review-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/list-for-pull-request-review-comment',
  path: '/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions',
  method: 'get',
  tag: 'reactions',
};

export function provideReactionsListForPullRequestReviewCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsListForPullRequestReviewCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_LIST_FOR_PULL_REQUEST_REVIEW_COMMENT,
    'REACTIONS_LIST_FOR_PULL_REQUEST_REVIEW_COMMENT',
    initialBehavior,
    _meta,
  );
}
