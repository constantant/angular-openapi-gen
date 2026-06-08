import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNELS_UPDATE } from './youtube-channels-update.token';
import type { YoutubeChannelsUpdateResponse } from './youtube-channels-update.token';

export function provideYoutubeChannelsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeChannelsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNELS_UPDATE,
    'YOUTUBE_CHANNELS_UPDATE',
    initialBehavior,
  );
}
