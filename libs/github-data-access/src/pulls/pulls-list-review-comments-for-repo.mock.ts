import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_LIST_REVIEW_COMMENTS_FOR_REPO } from './pulls-list-review-comments-for-repo.token';
import type { PullsListReviewCommentsForRepoResponse } from './pulls-list-review-comments-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/list-review-comments-for-repo',
  path: '/repos/{owner}/{repo}/pulls/comments',
  method: 'get',
  tag: 'pulls',
};

export function providePullsListReviewCommentsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<PullsListReviewCommentsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_LIST_REVIEW_COMMENTS_FOR_REPO,
    'PULLS_LIST_REVIEW_COMMENTS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
