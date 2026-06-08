import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_UNPIN_COMMENT } from './issues-unpin-comment.token';

export function provideIssuesUnpinCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_UNPIN_COMMENT,
    'ISSUES_UNPIN_COMMENT',
    initialBehavior,
  );
}
