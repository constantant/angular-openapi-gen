import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeLiveStreamsUpdate,
  type YoutubeLiveStreamsUpdateResponse,
} from './youtube-live-streams-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveStreams.update',
  path: '/youtube/v3/liveStreams',
  method: 'put',
  tag: 'live-streams',
};

export const YOUTUBE_LIVE_STREAMS_UPDATE_MOCK: MockEndpoint<YoutubeLiveStreamsUpdateResponse> =
  {
    key: 'YOUTUBE_LIVE_STREAMS_UPDATE',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeLiveStreamsUpdate,
  };

export function provideYoutubeLiveStreamsUpdateMock(
  initialBehavior?: MockEndpointBehavior<YoutubeLiveStreamsUpdateResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_LIVE_STREAMS_UPDATE_MOCK, initialBehavior);
}
