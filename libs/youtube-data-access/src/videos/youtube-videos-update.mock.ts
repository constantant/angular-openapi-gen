import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEOS_UPDATE } from './youtube-videos-update.token';
import type { YoutubeVideosUpdateResponse } from './youtube-videos-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.videos.update',
  path: '/youtube/v3/videos',
  method: 'put',
  tag: 'videos',
};

export function provideYoutubeVideosUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeVideosUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEOS_UPDATE,
    'YOUTUBE_VIDEOS_UPDATE',
    initialBehavior,
    _meta,
  );
}
