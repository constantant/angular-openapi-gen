import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_CREATE_FOR_ISSUE_COMMENT } from './reactions-create-for-issue-comment.token';
import type { ReactionsCreateForIssueCommentResponse } from './reactions-create-for-issue-comment.token';

export function provideReactionsCreateForIssueCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsCreateForIssueCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_CREATE_FOR_ISSUE_COMMENT,
    'REACTIONS_CREATE_FOR_ISSUE_COMMENT',
    initialBehavior,
  );
}
