import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_STREAMS_UPDATE } from './youtube-live-streams-update.token';
import type { YoutubeLiveStreamsUpdateResponse } from './youtube-live-streams-update.token';

export function provideYoutubeLiveStreamsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveStreamsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_STREAMS_UPDATE,
    'YOUTUBE_LIVE_STREAMS_UPDATE',
    initialBehavior,
  );
}
