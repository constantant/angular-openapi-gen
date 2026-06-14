import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_STREAMS_INSERT } from './youtube-live-streams-insert.token';
import type { YoutubeLiveStreamsInsertResponse } from './youtube-live-streams-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveStreams.insert',
  path: '/youtube/v3/liveStreams',
  method: 'post',
  tag: 'live-streams',
};

export function provideYoutubeLiveStreamsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveStreamsInsertResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_STREAMS_INSERT,
    'YOUTUBE_LIVE_STREAMS_INSERT',
    initialBehavior,
    _meta,
    options,
  );
}
