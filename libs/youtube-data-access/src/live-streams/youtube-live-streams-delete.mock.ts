import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_STREAMS_DELETE } from './youtube-live-streams-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveStreams.delete',
  path: '/youtube/v3/liveStreams',
  method: 'delete',
  tag: 'live-streams',
};

export function provideYoutubeLiveStreamsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_STREAMS_DELETE,
    'YOUTUBE_LIVE_STREAMS_DELETE',
    initialBehavior,
    _meta,
  );
}
