import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_GET_COMMENT } from './gists-get-comment.token';
import type { GistsGetCommentResponse } from './gists-get-comment.token';

export function provideGistsGetCommentMock(
  initialBehavior?: ProviderInitialBehavior<GistsGetCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_GET_COMMENT,
    'GISTS_GET_COMMENT',
    initialBehavior,
  );
}
