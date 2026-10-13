import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { provideYoutubeLiveBroadcastsDelete } from './youtube-live-broadcasts-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveBroadcasts.delete',
  path: '/youtube/v3/liveBroadcasts',
  method: 'delete',
  tag: 'live-broadcasts',
};

export const YOUTUBE_LIVE_BROADCASTS_DELETE_MOCK: MockEndpoint<unknown> = {
  key: 'YOUTUBE_LIVE_BROADCASTS_DELETE',
  baseUrl: YOUTUBE_BASE_URL,
  meta: _meta,
  provide: provideYoutubeLiveBroadcastsDelete,
};

export function provideYoutubeLiveBroadcastsDeleteMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_LIVE_BROADCASTS_DELETE_MOCK,
    initialBehavior,
  );
}
