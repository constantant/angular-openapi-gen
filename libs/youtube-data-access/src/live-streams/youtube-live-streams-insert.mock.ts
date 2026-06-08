import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_STREAMS_INSERT } from './youtube-live-streams-insert.token';
import type { YoutubeLiveStreamsInsertResponse } from './youtube-live-streams-insert.token';

export function provideYoutubeLiveStreamsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveStreamsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_STREAMS_INSERT,
    'YOUTUBE_LIVE_STREAMS_INSERT',
    initialBehavior,
  );
}
