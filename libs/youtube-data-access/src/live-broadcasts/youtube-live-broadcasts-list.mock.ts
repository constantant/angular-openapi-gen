import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_BROADCASTS_LIST } from './youtube-live-broadcasts-list.token';
import type { YoutubeLiveBroadcastsListResponse } from './youtube-live-broadcasts-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveBroadcasts.list',
  path: '/youtube/v3/liveBroadcasts',
  method: 'get',
  tag: 'live-broadcasts',
};

export function provideYoutubeLiveBroadcastsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveBroadcastsListResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    YOUTUBE_LIVE_BROADCASTS_LIST,
    'YOUTUBE_LIVE_BROADCASTS_LIST',
    initialBehavior,
    _meta,
    options,
  );
}
