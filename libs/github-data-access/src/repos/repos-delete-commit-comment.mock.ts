import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_COMMIT_COMMENT } from './repos-delete-commit-comment.token';

export function provideReposDeleteCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_COMMIT_COMMENT,
    'REPOS_DELETE_COMMIT_COMMENT',
    initialBehavior,
  );
}
