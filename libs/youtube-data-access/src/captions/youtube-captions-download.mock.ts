import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CAPTIONS_DOWNLOAD } from './youtube-captions-download.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.captions.download',
  path: '/youtube/v3/captions/{id}',
  method: 'get',
  tag: 'captions',
};

export function provideYoutubeCaptionsDownloadMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CAPTIONS_DOWNLOAD,
    'YOUTUBE_CAPTIONS_DOWNLOAD',
    initialBehavior,
    _meta,
  );
}
