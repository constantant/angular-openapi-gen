import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNELS_LIST } from './youtube-channels-list.token';
import type { YoutubeChannelsListResponse } from './youtube-channels-list.token';

export function provideYoutubeChannelsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeChannelsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNELS_LIST,
    'YOUTUBE_CHANNELS_LIST',
    initialBehavior,
  );
}
