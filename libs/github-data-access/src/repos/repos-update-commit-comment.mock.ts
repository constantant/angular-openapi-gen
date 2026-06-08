import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_COMMIT_COMMENT } from './repos-update-commit-comment.token';
import type { ReposUpdateCommitCommentResponse } from './repos-update-commit-comment.token';

export function provideReposUpdateCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateCommitCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_COMMIT_COMMENT,
    'REPOS_UPDATE_COMMIT_COMMENT',
    initialBehavior,
  );
}
