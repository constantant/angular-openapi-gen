import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeChannelsList,
  type YoutubeChannelsListResponse,
} from './youtube-channels-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.channels.list',
  path: '/youtube/v3/channels',
  method: 'get',
  tag: 'channels',
};

export const YOUTUBE_CHANNELS_LIST_MOCK: MockEndpoint<YoutubeChannelsListResponse> =
  {
    key: 'YOUTUBE_CHANNELS_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeChannelsList,
  };

export function provideYoutubeChannelsListMock(
  initialBehavior?: MockEndpointBehavior<YoutubeChannelsListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_CHANNELS_LIST_MOCK, initialBehavior);
}
