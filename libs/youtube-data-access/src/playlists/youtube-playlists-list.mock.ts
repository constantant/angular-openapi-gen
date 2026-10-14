import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubePlaylistsList,
  type YoutubePlaylistsListResponse,
} from './youtube-playlists-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlists.list',
  path: '/youtube/v3/playlists',
  method: 'get',
  tag: 'playlists',
};

export const YOUTUBE_PLAYLISTS_LIST_MOCK: MockEndpoint<YoutubePlaylistsListResponse> =
  {
    key: 'YOUTUBE_PLAYLISTS_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubePlaylistsList,
  };

export function provideYoutubePlaylistsListMock(
  initialBehavior?: MockEndpointBehavior<YoutubePlaylistsListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_PLAYLISTS_LIST_MOCK, initialBehavior);
}
