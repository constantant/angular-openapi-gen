import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEOS_GET_RATING } from './youtube-videos-get-rating.token';
import type { YoutubeVideosGetRatingResponse } from './youtube-videos-get-rating.token';

export function provideYoutubeVideosGetRatingMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeVideosGetRatingResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEOS_GET_RATING,
    'YOUTUBE_VIDEOS_GET_RATING',
    initialBehavior,
  );
}
