import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_COMMENTS_FOR_COMMIT } from './repos-list-comments-for-commit.token';
import type { ReposListCommentsForCommitResponse } from './repos-list-comments-for-commit.token';

export function provideReposListCommentsForCommitMock(
  initialBehavior?: ProviderInitialBehavior<ReposListCommentsForCommitResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_COMMENTS_FOR_COMMIT,
    'REPOS_LIST_COMMENTS_FOR_COMMIT',
    initialBehavior,
  );
}
