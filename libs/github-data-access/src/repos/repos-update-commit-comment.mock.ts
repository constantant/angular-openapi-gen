import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_COMMIT_COMMENT } from './repos-update-commit-comment.token';
import type { ReposUpdateCommitCommentResponse } from './repos-update-commit-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-commit-comment',
  path: '/repos/{owner}/{repo}/comments/{comment_id}',
  method: 'patch',
  tag: 'repos',
};

export function provideReposUpdateCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateCommitCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_COMMIT_COMMENT,
    'REPOS_UPDATE_COMMIT_COMMENT',
    initialBehavior,
    _meta,
  );
}
