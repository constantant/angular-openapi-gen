import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CAPTIONS_UPDATE } from './youtube-captions-update.token';
import type { YoutubeCaptionsUpdateResponse } from './youtube-captions-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.captions.update',
  path: '/youtube/v3/captions',
  method: 'put',
  tag: 'captions',
};

export function provideYoutubeCaptionsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeCaptionsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CAPTIONS_UPDATE,
    'YOUTUBE_CAPTIONS_UPDATE',
    initialBehavior,
    _meta,
  );
}
