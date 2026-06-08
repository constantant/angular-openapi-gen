import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_CREATE_FOR_COMMIT_COMMENT } from './reactions-create-for-commit-comment.token';
import type { ReactionsCreateForCommitCommentResponse } from './reactions-create-for-commit-comment.token';

export function provideReactionsCreateForCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsCreateForCommitCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_CREATE_FOR_COMMIT_COMMENT,
    'REACTIONS_CREATE_FOR_COMMIT_COMMENT',
    initialBehavior,
  );
}
