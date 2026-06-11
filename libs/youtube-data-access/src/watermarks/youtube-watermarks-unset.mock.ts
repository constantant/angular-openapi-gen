import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_WATERMARKS_UNSET } from './youtube-watermarks-unset.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.watermarks.unset',
  path: '/youtube/v3/watermarks/unset',
  method: 'post',
  tag: 'watermarks',
};

export function provideYoutubeWatermarksUnsetMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_WATERMARKS_UNSET,
    'YOUTUBE_WATERMARKS_UNSET',
    initialBehavior,
    _meta,
  );
}
