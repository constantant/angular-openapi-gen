import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_LIST_FOR_COMMIT_COMMENT } from './reactions-list-for-commit-comment.token';
import type { ReactionsListForCommitCommentResponse } from './reactions-list-for-commit-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/list-for-commit-comment',
  path: '/repos/{owner}/{repo}/comments/{comment_id}/reactions',
  method: 'get',
  tag: 'reactions',
};

export function provideReactionsListForCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsListForCommitCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_LIST_FOR_COMMIT_COMMENT,
    'REACTIONS_LIST_FOR_COMMIT_COMMENT',
    initialBehavior,
    _meta,
  );
}
