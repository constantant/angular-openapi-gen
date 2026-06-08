import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_CREATE_COMMENT } from './issues-create-comment.token';
import type { IssuesCreateCommentResponse } from './issues-create-comment.token';

export function provideIssuesCreateCommentMock(
  initialBehavior?: ProviderInitialBehavior<IssuesCreateCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_CREATE_COMMENT,
    'ISSUES_CREATE_COMMENT',
    initialBehavior,
  );
}
