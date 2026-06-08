import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_DELETE_FOR_ISSUE_COMMENT } from './reactions-delete-for-issue-comment.token';

export function provideReactionsDeleteForIssueCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_DELETE_FOR_ISSUE_COMMENT,
    'REACTIONS_DELETE_FOR_ISSUE_COMMENT',
    initialBehavior,
  );
}
