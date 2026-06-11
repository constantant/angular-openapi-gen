import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEOS_LIST } from './youtube-videos-list.token';
import type { YoutubeVideosListResponse } from './youtube-videos-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.videos.list',
  path: '/youtube/v3/videos',
  method: 'get',
  tag: 'videos',
};

export function provideYoutubeVideosListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeVideosListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEOS_LIST,
    'YOUTUBE_VIDEOS_LIST',
    initialBehavior,
    _meta,
  );
}
