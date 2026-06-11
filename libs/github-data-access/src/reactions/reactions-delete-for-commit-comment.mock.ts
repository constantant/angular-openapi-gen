import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_DELETE_FOR_COMMIT_COMMENT } from './reactions-delete-for-commit-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/delete-for-commit-comment',
  path: '/repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}',
  method: 'delete',
  tag: 'reactions',
};

export function provideReactionsDeleteForCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_DELETE_FOR_COMMIT_COMMENT,
    'REACTIONS_DELETE_FOR_COMMIT_COMMENT',
    initialBehavior,
    _meta,
  );
}
