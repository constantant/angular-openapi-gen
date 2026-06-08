import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_DELETE_FOR_COMMIT_COMMENT } from './reactions-delete-for-commit-comment.token';

export function provideReactionsDeleteForCommitCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_DELETE_FOR_COMMIT_COMMENT,
    'REACTIONS_DELETE_FOR_COMMIT_COMMENT',
    initialBehavior,
  );
}
