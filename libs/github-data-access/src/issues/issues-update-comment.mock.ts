import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_UPDATE_COMMENT } from './issues-update-comment.token';
import type { IssuesUpdateCommentResponse } from './issues-update-comment.token';

export function provideIssuesUpdateCommentMock(
  initialBehavior?: ProviderInitialBehavior<IssuesUpdateCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_UPDATE_COMMENT,
    'ISSUES_UPDATE_COMMENT',
    initialBehavior,
  );
}
