import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_COMMENTS_FOR_COMMIT } from './repos-list-comments-for-commit.token';
import type { ReposListCommentsForCommitResponse } from './repos-list-comments-for-commit.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-comments-for-commit',
  path: '/repos/{owner}/{repo}/commits/{commit_sha}/comments',
  method: 'get',
  tag: 'repos',
};

export function provideReposListCommentsForCommitMock(
  initialBehavior?: ProviderInitialBehavior<ReposListCommentsForCommitResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_COMMENTS_FOR_COMMIT,
    'REPOS_LIST_COMMENTS_FOR_COMMIT',
    initialBehavior,
    _meta,
    options,
  );
}
