import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_COMMENTS } from './issues-list-comments.token';
import type { IssuesListCommentsResponse } from './issues-list-comments.token';

export function provideIssuesListCommentsMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListCommentsResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_COMMENTS,
    'ISSUES_LIST_COMMENTS',
    initialBehavior,
  );
}
