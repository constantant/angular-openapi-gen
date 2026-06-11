import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_COMMIT_COMMENT } from './repos-create-commit-comment.token';
import type { ReposCreateCommitCommentResponse } from './repos-create-commit-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-commit-comment',
  path: '/repos/{owner}/{repo}/commits/{commit_sha}/comments',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateCommitCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_COMMIT_COMMENT,
    'REPOS_CREATE_COMMIT_COMMENT',
    initialBehavior,
    _meta,
  );
}
