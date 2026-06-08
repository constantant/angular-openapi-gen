import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_LIST_FOR_COMMIT_COMMENT } from './reactions-list-for-commit-comment.token';
import type { ReactionsListForCommitCommentResponse } from './reactions-list-for-commit-comment.token';

export function provideReactionsListForCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsListForCommitCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_LIST_FOR_COMMIT_COMMENT,
    'REACTIONS_LIST_FOR_COMMIT_COMMENT',
    initialBehavior,
  );
}
