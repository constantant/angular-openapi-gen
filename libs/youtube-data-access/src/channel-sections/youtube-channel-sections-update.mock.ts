import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNEL_SECTIONS_UPDATE } from './youtube-channel-sections-update.token';
import type { YoutubeChannelSectionsUpdateResponse } from './youtube-channel-sections-update.token';

export function provideYoutubeChannelSectionsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeChannelSectionsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNEL_SECTIONS_UPDATE,
    'YOUTUBE_CHANNEL_SECTIONS_UPDATE',
    initialBehavior,
  );
}
