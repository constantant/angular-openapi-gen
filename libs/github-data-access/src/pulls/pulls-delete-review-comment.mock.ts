import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_DELETE_REVIEW_COMMENT } from './pulls-delete-review-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/delete-review-comment',
  path: '/repos/{owner}/{repo}/pulls/comments/{comment_id}',
  method: 'delete',
  tag: 'pulls',
};

export function providePullsDeleteReviewCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PULLS_DELETE_REVIEW_COMMENT,
    'PULLS_DELETE_REVIEW_COMMENT',
    initialBehavior,
    _meta,
  );
}
