import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNEL_SECTIONS_INSERT } from './youtube-channel-sections-insert.token';
import type { YoutubeChannelSectionsInsertResponse } from './youtube-channel-sections-insert.token';

export function provideYoutubeChannelSectionsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeChannelSectionsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNEL_SECTIONS_INSERT,
    'YOUTUBE_CHANNEL_SECTIONS_INSERT',
    initialBehavior,
  );
}
