import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_BROADCASTS_BIND } from './youtube-live-broadcasts-bind.token';
import type { YoutubeLiveBroadcastsBindResponse } from './youtube-live-broadcasts-bind.token';

export function provideYoutubeLiveBroadcastsBindMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveBroadcastsBindResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_BROADCASTS_BIND,
    'YOUTUBE_LIVE_BROADCASTS_BIND',
    initialBehavior,
  );
}
