import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT } from './youtube-live-broadcasts-insert-cuepoint.token';
import type { YoutubeLiveBroadcastsInsertCuepointResponse } from './youtube-live-broadcasts-insert-cuepoint.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveBroadcasts.insertCuepoint',
  path: '/youtube/v3/liveBroadcasts/cuepoint',
  method: 'post',
  tag: 'live-broadcasts',
};

export function provideYoutubeLiveBroadcastsInsertCuepointMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveBroadcastsInsertCuepointResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT,
    'YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT',
    initialBehavior,
    _meta,
  );
}
