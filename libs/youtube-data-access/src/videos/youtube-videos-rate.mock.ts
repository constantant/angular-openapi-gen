import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEOS_RATE } from './youtube-videos-rate.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.videos.rate',
  path: '/youtube/v3/videos/rate',
  method: 'post',
  tag: 'videos',
};

export function provideYoutubeVideosRateMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEOS_RATE,
    'YOUTUBE_VIDEOS_RATE',
    initialBehavior,
    _meta,
  );
}
