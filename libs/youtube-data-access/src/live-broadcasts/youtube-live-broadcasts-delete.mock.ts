import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_BROADCASTS_DELETE } from './youtube-live-broadcasts-delete.token';

export function provideYoutubeLiveBroadcastsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_BROADCASTS_DELETE,
    'YOUTUBE_LIVE_BROADCASTS_DELETE',
    initialBehavior,
  );
}
