import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { provideYoutubeLiveStreamsDelete } from './youtube-live-streams-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveStreams.delete',
  path: '/youtube/v3/liveStreams',
  method: 'delete',
  tag: 'live-streams',
};

export const YOUTUBE_LIVE_STREAMS_DELETE_MOCK: MockEndpoint<unknown> = {
  key: 'YOUTUBE_LIVE_STREAMS_DELETE',
  baseUrl: YOUTUBE_BASE_URL,
  meta: _meta,
  provide: provideYoutubeLiveStreamsDelete,
};

export function provideYoutubeLiveStreamsDeleteMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_LIVE_STREAMS_DELETE_MOCK, initialBehavior);
}
