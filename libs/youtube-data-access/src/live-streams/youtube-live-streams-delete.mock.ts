import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_STREAMS_DELETE } from './youtube-live-streams-delete.token';

export function provideYoutubeLiveStreamsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_STREAMS_DELETE,
    'YOUTUBE_LIVE_STREAMS_DELETE',
    initialBehavior,
  );
}
