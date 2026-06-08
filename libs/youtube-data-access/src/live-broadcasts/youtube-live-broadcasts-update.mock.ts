import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_BROADCASTS_UPDATE } from './youtube-live-broadcasts-update.token';
import type { YoutubeLiveBroadcastsUpdateResponse } from './youtube-live-broadcasts-update.token';

export function provideYoutubeLiveBroadcastsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveBroadcastsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_BROADCASTS_UPDATE,
    'YOUTUBE_LIVE_BROADCASTS_UPDATE',
    initialBehavior,
  );
}
