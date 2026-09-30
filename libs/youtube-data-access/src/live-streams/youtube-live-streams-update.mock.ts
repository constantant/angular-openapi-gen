import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_STREAMS_UPDATE } from './youtube-live-streams-update.token';
import type { YoutubeLiveStreamsUpdateResponse } from './youtube-live-streams-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveStreams.update',
  path: '/youtube/v3/liveStreams',
  method: 'put',
  tag: 'live-streams',
};

export function provideYoutubeLiveStreamsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveStreamsUpdateResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    YOUTUBE_LIVE_STREAMS_UPDATE,
    'YOUTUBE_LIVE_STREAMS_UPDATE',
    initialBehavior,
    _meta,
    options,
  );
}
