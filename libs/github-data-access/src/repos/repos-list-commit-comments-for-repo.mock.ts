import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_COMMIT_COMMENTS_FOR_REPO } from './repos-list-commit-comments-for-repo.token';
import type { ReposListCommitCommentsForRepoResponse } from './repos-list-commit-comments-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-commit-comments-for-repo',
  path: '/repos/{owner}/{repo}/comments',
  method: 'get',
  tag: 'repos',
};

export function provideReposListCommitCommentsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ReposListCommitCommentsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_COMMIT_COMMENTS_FOR_REPO,
    'REPOS_LIST_COMMIT_COMMENTS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
