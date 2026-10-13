import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeLiveBroadcastsList,
  type YoutubeLiveBroadcastsListResponse,
} from './youtube-live-broadcasts-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveBroadcasts.list',
  path: '/youtube/v3/liveBroadcasts',
  method: 'get',
  tag: 'live-broadcasts',
};

export const YOUTUBE_LIVE_BROADCASTS_LIST_MOCK: MockEndpoint<YoutubeLiveBroadcastsListResponse> =
  {
    key: 'YOUTUBE_LIVE_BROADCASTS_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeLiveBroadcastsList,
  };

export function provideYoutubeLiveBroadcastsListMock(
  initialBehavior?: MockEndpointBehavior<YoutubeLiveBroadcastsListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_LIVE_BROADCASTS_LIST_MOCK,
    initialBehavior,
  );
}
