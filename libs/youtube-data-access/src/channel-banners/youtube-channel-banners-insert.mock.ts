import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNEL_BANNERS_INSERT } from './youtube-channel-banners-insert.token';
import type { YoutubeChannelBannersInsertResponse } from './youtube-channel-banners-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.channelBanners.insert',
  path: '/youtube/v3/channelBanners/insert',
  method: 'post',
  tag: 'channel-banners',
};

export function provideYoutubeChannelBannersInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeChannelBannersInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNEL_BANNERS_INSERT,
    'YOUTUBE_CHANNEL_BANNERS_INSERT',
    initialBehavior,
    _meta,
  );
}
