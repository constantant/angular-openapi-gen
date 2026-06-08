import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_UPDATE_COMMENT } from './gists-update-comment.token';
import type { GistsUpdateCommentResponse } from './gists-update-comment.token';

export function provideGistsUpdateCommentMock(
  initialBehavior?: ProviderInitialBehavior<GistsUpdateCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_UPDATE_COMMENT,
    'GISTS_UPDATE_COMMENT',
    initialBehavior,
  );
}
