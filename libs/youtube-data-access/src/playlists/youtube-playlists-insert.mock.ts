import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubePlaylistsInsert,
  type YoutubePlaylistsInsertResponse,
} from './youtube-playlists-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlists.insert',
  path: '/youtube/v3/playlists',
  method: 'post',
  tag: 'playlists',
};

export const YOUTUBE_PLAYLISTS_INSERT_MOCK: MockEndpoint<YoutubePlaylistsInsertResponse> =
  {
    key: 'YOUTUBE_PLAYLISTS_INSERT',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubePlaylistsInsert,
  };

export function provideYoutubePlaylistsInsertMock(
  initialBehavior?: MockEndpointBehavior<YoutubePlaylistsInsertResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_PLAYLISTS_INSERT_MOCK, initialBehavior);
}
