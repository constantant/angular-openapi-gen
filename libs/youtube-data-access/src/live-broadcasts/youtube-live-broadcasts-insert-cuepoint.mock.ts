import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeLiveBroadcastsInsertCuepoint,
  type YoutubeLiveBroadcastsInsertCuepointResponse,
} from './youtube-live-broadcasts-insert-cuepoint.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveBroadcasts.insertCuepoint',
  path: '/youtube/v3/liveBroadcasts/cuepoint',
  method: 'post',
  tag: 'live-broadcasts',
};

export const YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT_MOCK: MockEndpoint<YoutubeLiveBroadcastsInsertCuepointResponse> =
  {
    key: 'YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeLiveBroadcastsInsertCuepoint,
  };

export function provideYoutubeLiveBroadcastsInsertCuepointMock(
  initialBehavior?: MockEndpointBehavior<YoutubeLiveBroadcastsInsertCuepointResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT_MOCK,
    initialBehavior,
  );
}
