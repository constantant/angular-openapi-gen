import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubePlaylistsUpdate,
  type YoutubePlaylistsUpdateResponse,
} from './youtube-playlists-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlists.update',
  path: '/youtube/v3/playlists',
  method: 'put',
  tag: 'playlists',
};

export const YOUTUBE_PLAYLISTS_UPDATE_MOCK: MockEndpoint<YoutubePlaylistsUpdateResponse> =
  {
    key: 'YOUTUBE_PLAYLISTS_UPDATE',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubePlaylistsUpdate,
  };

export function provideYoutubePlaylistsUpdateMock(
  initialBehavior?: MockEndpointBehavior<YoutubePlaylistsUpdateResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_PLAYLISTS_UPDATE_MOCK, initialBehavior);
}
