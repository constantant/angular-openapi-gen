import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_CREATE_COMMENT } from './gists-create-comment.token';
import type { GistsCreateCommentResponse } from './gists-create-comment.token';

export function provideGistsCreateCommentMock(
  initialBehavior?: ProviderInitialBehavior<GistsCreateCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_CREATE_COMMENT,
    'GISTS_CREATE_COMMENT',
    initialBehavior,
  );
}
