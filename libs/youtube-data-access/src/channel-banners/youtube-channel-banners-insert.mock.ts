import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeChannelBannersInsert,
  type YoutubeChannelBannersInsertResponse,
} from './youtube-channel-banners-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.channelBanners.insert',
  path: '/youtube/v3/channelBanners/insert',
  method: 'post',
  tag: 'channel-banners',
};

export const YOUTUBE_CHANNEL_BANNERS_INSERT_MOCK: MockEndpoint<YoutubeChannelBannersInsertResponse> =
  {
    key: 'YOUTUBE_CHANNEL_BANNERS_INSERT',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeChannelBannersInsert,
  };

export function provideYoutubeChannelBannersInsertMock(
  initialBehavior?: MockEndpointBehavior<YoutubeChannelBannersInsertResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_CHANNEL_BANNERS_INSERT_MOCK,
    initialBehavior,
  );
}
