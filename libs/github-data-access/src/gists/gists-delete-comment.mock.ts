import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_DELETE_COMMENT } from './gists-delete-comment.token';

export function provideGistsDeleteCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    GISTS_DELETE_COMMENT,
    'GISTS_DELETE_COMMENT',
    initialBehavior,
  );
}
