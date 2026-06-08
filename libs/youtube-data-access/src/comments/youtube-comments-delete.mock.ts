import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENTS_DELETE } from './youtube-comments-delete.token';

export function provideYoutubeCommentsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENTS_DELETE,
    'YOUTUBE_COMMENTS_DELETE',
    initialBehavior,
  );
}
