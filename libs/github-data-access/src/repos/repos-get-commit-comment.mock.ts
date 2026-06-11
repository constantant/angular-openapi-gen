import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_COMMIT_COMMENT } from './repos-get-commit-comment.token';
import type { ReposGetCommitCommentResponse } from './repos-get-commit-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-commit-comment',
  path: '/repos/{owner}/{repo}/comments/{comment_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCommitCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_COMMIT_COMMENT,
    'REPOS_GET_COMMIT_COMMENT',
    initialBehavior,
    _meta,
  );
}
