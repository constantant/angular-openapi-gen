import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_PIN_COMMENT } from './issues-pin-comment.token';
import type { IssuesPinCommentResponse } from './issues-pin-comment.token';

export function provideIssuesPinCommentMock(
  initialBehavior?: ProviderInitialBehavior<IssuesPinCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_PIN_COMMENT,
    'ISSUES_PIN_COMMENT',
    initialBehavior,
  );
}
