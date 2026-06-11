import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_CREATE_FOR_COMMIT_COMMENT } from './reactions-create-for-commit-comment.token';
import type { ReactionsCreateForCommitCommentResponse } from './reactions-create-for-commit-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/create-for-commit-comment',
  path: '/repos/{owner}/{repo}/comments/{comment_id}/reactions',
  method: 'post',
  tag: 'reactions',
};

export function provideReactionsCreateForCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsCreateForCommitCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_CREATE_FOR_COMMIT_COMMENT,
    'REACTIONS_CREATE_FOR_COMMIT_COMMENT',
    initialBehavior,
    _meta,
  );
}
