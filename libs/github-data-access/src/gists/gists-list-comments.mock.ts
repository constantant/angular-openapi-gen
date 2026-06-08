import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_LIST_COMMENTS } from './gists-list-comments.token';
import type { GistsListCommentsResponse } from './gists-list-comments.token';

export function provideGistsListCommentsMock(
  initialBehavior?: ProviderInitialBehavior<GistsListCommentsResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_LIST_COMMENTS,
    'GISTS_LIST_COMMENTS',
    initialBehavior,
  );
}
