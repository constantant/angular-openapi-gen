import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_THUMBNAILS_SET } from './youtube-thumbnails-set.token';
import type { YoutubeThumbnailsSetResponse } from './youtube-thumbnails-set.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.thumbnails.set',
  path: '/youtube/v3/thumbnails/set',
  method: 'post',
  tag: 'thumbnails',
};

export function provideYoutubeThumbnailsSetMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeThumbnailsSetResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_THUMBNAILS_SET,
    'YOUTUBE_THUMBNAILS_SET',
    initialBehavior,
    _meta,
  );
}
