import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEOS_LIST } from './youtube-videos-list.token';
import type { YoutubeVideosListResponse } from './youtube-videos-list.token';

export function provideYoutubeVideosListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeVideosListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEOS_LIST,
    'YOUTUBE_VIDEOS_LIST',
    initialBehavior,
  );
}
