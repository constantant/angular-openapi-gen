import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_BROADCASTS_TRANSITION } from './youtube-live-broadcasts-transition.token';
import type { YoutubeLiveBroadcastsTransitionResponse } from './youtube-live-broadcasts-transition.token';

export function provideYoutubeLiveBroadcastsTransitionMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveBroadcastsTransitionResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_BROADCASTS_TRANSITION,
    'YOUTUBE_LIVE_BROADCASTS_TRANSITION',
    initialBehavior,
  );
}
