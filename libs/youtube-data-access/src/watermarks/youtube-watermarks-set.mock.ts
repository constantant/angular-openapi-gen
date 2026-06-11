import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_WATERMARKS_SET } from './youtube-watermarks-set.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.watermarks.set',
  path: '/youtube/v3/watermarks/set',
  method: 'post',
  tag: 'watermarks',
};

export function provideYoutubeWatermarksSetMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_WATERMARKS_SET,
    'YOUTUBE_WATERMARKS_SET',
    initialBehavior,
    _meta,
  );
}
