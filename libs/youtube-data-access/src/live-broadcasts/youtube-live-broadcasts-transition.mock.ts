import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_BROADCASTS_TRANSITION } from './youtube-live-broadcasts-transition.token';
import type { YoutubeLiveBroadcastsTransitionResponse } from './youtube-live-broadcasts-transition.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveBroadcasts.transition',
  path: '/youtube/v3/liveBroadcasts/transition',
  method: 'post',
  tag: 'live-broadcasts',
};

export function provideYoutubeLiveBroadcastsTransitionMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveBroadcastsTransitionResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_BROADCASTS_TRANSITION,
    'YOUTUBE_LIVE_BROADCASTS_TRANSITION',
    initialBehavior,
    _meta,
  );
}
