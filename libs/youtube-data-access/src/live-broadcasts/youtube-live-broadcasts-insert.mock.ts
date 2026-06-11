import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_BROADCASTS_INSERT } from './youtube-live-broadcasts-insert.token';
import type { YoutubeLiveBroadcastsInsertResponse } from './youtube-live-broadcasts-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveBroadcasts.insert',
  path: '/youtube/v3/liveBroadcasts',
  method: 'post',
  tag: 'live-broadcasts',
};

export function provideYoutubeLiveBroadcastsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveBroadcastsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_BROADCASTS_INSERT,
    'YOUTUBE_LIVE_BROADCASTS_INSERT',
    initialBehavior,
    _meta,
  );
}
