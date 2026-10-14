import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeChannelSectionsInsert,
  type YoutubeChannelSectionsInsertResponse,
} from './youtube-channel-sections-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.channelSections.insert',
  path: '/youtube/v3/channelSections',
  method: 'post',
  tag: 'channel-sections',
};

export const YOUTUBE_CHANNEL_SECTIONS_INSERT_MOCK: MockEndpoint<YoutubeChannelSectionsInsertResponse> =
  {
    key: 'YOUTUBE_CHANNEL_SECTIONS_INSERT',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeChannelSectionsInsert,
  };

export function provideYoutubeChannelSectionsInsertMock(
  initialBehavior?: MockEndpointBehavior<YoutubeChannelSectionsInsertResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_CHANNEL_SECTIONS_INSERT_MOCK,
    initialBehavior,
  );
}
