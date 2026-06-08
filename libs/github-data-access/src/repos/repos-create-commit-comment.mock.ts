import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_COMMIT_COMMENT } from './repos-create-commit-comment.token';
import type { ReposCreateCommitCommentResponse } from './repos-create-commit-comment.token';

export function provideReposCreateCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateCommitCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_COMMIT_COMMENT,
    'REPOS_CREATE_COMMIT_COMMENT',
    initialBehavior,
  );
}
