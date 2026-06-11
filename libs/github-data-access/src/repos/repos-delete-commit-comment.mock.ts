import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_COMMIT_COMMENT } from './repos-delete-commit-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-commit-comment',
  path: '/repos/{owner}/{repo}/comments/{comment_id}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_COMMIT_COMMENT,
    'REPOS_DELETE_COMMIT_COMMENT',
    initialBehavior,
    _meta,
  );
}
