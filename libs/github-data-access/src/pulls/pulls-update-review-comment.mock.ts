import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_UPDATE_REVIEW_COMMENT } from './pulls-update-review-comment.token';
import type { PullsUpdateReviewCommentResponse } from './pulls-update-review-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/update-review-comment',
  path: '/repos/{owner}/{repo}/pulls/comments/{comment_id}',
  method: 'patch',
  tag: 'pulls',
};

export function providePullsUpdateReviewCommentMock(
  initialBehavior?: ProviderInitialBehavior<PullsUpdateReviewCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_UPDATE_REVIEW_COMMENT,
    'PULLS_UPDATE_REVIEW_COMMENT',
    initialBehavior,
    _meta,
  );
}
