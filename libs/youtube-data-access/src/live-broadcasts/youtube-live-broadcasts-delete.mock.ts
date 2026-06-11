import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_BROADCASTS_DELETE } from './youtube-live-broadcasts-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveBroadcasts.delete',
  path: '/youtube/v3/liveBroadcasts',
  method: 'delete',
  tag: 'live-broadcasts',
};

export function provideYoutubeLiveBroadcastsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_BROADCASTS_DELETE,
    'YOUTUBE_LIVE_BROADCASTS_DELETE',
    initialBehavior,
    _meta,
  );
}
