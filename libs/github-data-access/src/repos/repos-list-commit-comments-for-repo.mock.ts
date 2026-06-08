import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_COMMIT_COMMENTS_FOR_REPO } from './repos-list-commit-comments-for-repo.token';
import type { ReposListCommitCommentsForRepoResponse } from './repos-list-commit-comments-for-repo.token';

export function provideReposListCommitCommentsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ReposListCommitCommentsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_COMMIT_COMMENTS_FOR_REPO,
    'REPOS_LIST_COMMIT_COMMENTS_FOR_REPO',
    initialBehavior,
  );
}
