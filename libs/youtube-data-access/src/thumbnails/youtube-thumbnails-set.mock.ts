import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
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
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    YOUTUBE_THUMBNAILS_SET,
    'YOUTUBE_THUMBNAILS_SET',
    initialBehavior,
    _meta,
    options,
  );
}
