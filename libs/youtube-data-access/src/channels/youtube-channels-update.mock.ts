import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeChannelsUpdate,
  type YoutubeChannelsUpdateResponse,
} from './youtube-channels-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.channels.update',
  path: '/youtube/v3/channels',
  method: 'put',
  tag: 'channels',
};

export const YOUTUBE_CHANNELS_UPDATE_MOCK: MockEndpoint<YoutubeChannelsUpdateResponse> =
  {
    key: 'YOUTUBE_CHANNELS_UPDATE',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeChannelsUpdate,
  };

export function provideYoutubeChannelsUpdateMock(
  initialBehavior?: MockEndpointBehavior<YoutubeChannelsUpdateResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_CHANNELS_UPDATE_MOCK, initialBehavior);
}
