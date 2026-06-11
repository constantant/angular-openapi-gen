import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_STREAMS_LIST } from './youtube-live-streams-list.token';
import type { YoutubeLiveStreamsListResponse } from './youtube-live-streams-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveStreams.list',
  path: '/youtube/v3/liveStreams',
  method: 'get',
  tag: 'live-streams',
};

export function provideYoutubeLiveStreamsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveStreamsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_STREAMS_LIST,
    'YOUTUBE_LIVE_STREAMS_LIST',
    initialBehavior,
    _meta,
  );
}
