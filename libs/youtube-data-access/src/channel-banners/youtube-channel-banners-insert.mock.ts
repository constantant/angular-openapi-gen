import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNEL_BANNERS_INSERT } from './youtube-channel-banners-insert.token';
import type { YoutubeChannelBannersInsertResponse } from './youtube-channel-banners-insert.token';

export function provideYoutubeChannelBannersInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeChannelBannersInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNEL_BANNERS_INSERT,
    'YOUTUBE_CHANNEL_BANNERS_INSERT',
    initialBehavior,
  );
}
