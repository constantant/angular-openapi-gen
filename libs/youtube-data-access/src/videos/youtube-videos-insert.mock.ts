import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEOS_INSERT } from './youtube-videos-insert.token';
import type { YoutubeVideosInsertResponse } from './youtube-videos-insert.token';

export function provideYoutubeVideosInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeVideosInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEOS_INSERT,
    'YOUTUBE_VIDEOS_INSERT',
    initialBehavior,
  );
}
