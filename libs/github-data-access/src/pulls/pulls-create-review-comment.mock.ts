import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_CREATE_REVIEW_COMMENT } from './pulls-create-review-comment.token';
import type { PullsCreateReviewCommentResponse } from './pulls-create-review-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/create-review-comment',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/comments',
  method: 'post',
  tag: 'pulls',
};

export function providePullsCreateReviewCommentMock(
  initialBehavior?: ProviderInitialBehavior<PullsCreateReviewCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_CREATE_REVIEW_COMMENT,
    'PULLS_CREATE_REVIEW_COMMENT',
    initialBehavior,
    _meta,
  );
}
