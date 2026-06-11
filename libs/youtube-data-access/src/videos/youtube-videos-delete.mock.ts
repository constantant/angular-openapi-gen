import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEOS_DELETE } from './youtube-videos-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.videos.delete',
  path: '/youtube/v3/videos',
  method: 'delete',
  tag: 'videos',
};

export function provideYoutubeVideosDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEOS_DELETE,
    'YOUTUBE_VIDEOS_DELETE',
    initialBehavior,
    _meta,
  );
}
