import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_GET_COMMENT } from './issues-get-comment.token';
import type { IssuesGetCommentResponse } from './issues-get-comment.token';

export function provideIssuesGetCommentMock(
  initialBehavior?: ProviderInitialBehavior<IssuesGetCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_GET_COMMENT,
    'ISSUES_GET_COMMENT',
    initialBehavior,
  );
}
