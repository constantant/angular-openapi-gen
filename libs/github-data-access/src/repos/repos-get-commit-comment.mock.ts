import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_COMMIT_COMMENT } from './repos-get-commit-comment.token';
import type { ReposGetCommitCommentResponse } from './repos-get-commit-comment.token';

export function provideReposGetCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCommitCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_COMMIT_COMMENT,
    'REPOS_GET_COMMIT_COMMENT',
    initialBehavior,
  );
}
