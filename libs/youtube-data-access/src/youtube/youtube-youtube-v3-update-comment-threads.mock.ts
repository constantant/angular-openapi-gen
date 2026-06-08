import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_YOUTUBE_V3_UPDATE_COMMENT_THREADS } from './youtube-youtube-v3-update-comment-threads.token';
import type { YoutubeYoutubeV3UpdateCommentThreadsResponse } from './youtube-youtube-v3-update-comment-threads.token';

export function provideYoutubeYoutubeV3UpdateCommentThreadsMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeYoutubeV3UpdateCommentThreadsResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_YOUTUBE_V3_UPDATE_COMMENT_THREADS,
    'YOUTUBE_YOUTUBE_V3_UPDATE_COMMENT_THREADS',
    initialBehavior,
  );
}
