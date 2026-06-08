import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_BROADCASTS_INSERT } from './youtube-live-broadcasts-insert.token';
import type { YoutubeLiveBroadcastsInsertResponse } from './youtube-live-broadcasts-insert.token';

export function provideYoutubeLiveBroadcastsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveBroadcastsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_BROADCASTS_INSERT,
    'YOUTUBE_LIVE_BROADCASTS_INSERT',
    initialBehavior,
  );
}
