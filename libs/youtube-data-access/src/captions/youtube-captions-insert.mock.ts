import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CAPTIONS_INSERT } from './youtube-captions-insert.token';
import type { YoutubeCaptionsInsertResponse } from './youtube-captions-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.captions.insert',
  path: '/youtube/v3/captions',
  method: 'post',
  tag: 'captions',
};

export function provideYoutubeCaptionsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeCaptionsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CAPTIONS_INSERT,
    'YOUTUBE_CAPTIONS_INSERT',
    initialBehavior,
    _meta,
  );
}
