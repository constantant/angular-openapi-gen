import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_DELETE_COMMENT } from './issues-delete-comment.token';

export function provideIssuesDeleteCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_DELETE_COMMENT,
    'ISSUES_DELETE_COMMENT',
    initialBehavior,
  );
}
