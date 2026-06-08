import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENTS_INSERT } from './youtube-comments-insert.token';
import type { YoutubeCommentsInsertResponse } from './youtube-comments-insert.token';

export function provideYoutubeCommentsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeCommentsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENTS_INSERT,
    'YOUTUBE_COMMENTS_INSERT',
    initialBehavior,
  );
}
