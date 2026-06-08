import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_BROADCASTS_LIST } from './youtube-live-broadcasts-list.token';
import type { YoutubeLiveBroadcastsListResponse } from './youtube-live-broadcasts-list.token';

export function provideYoutubeLiveBroadcastsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveBroadcastsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_BROADCASTS_LIST,
    'YOUTUBE_LIVE_BROADCASTS_LIST',
    initialBehavior,
  );
}
