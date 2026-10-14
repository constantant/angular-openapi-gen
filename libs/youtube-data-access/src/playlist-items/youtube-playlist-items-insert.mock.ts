import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubePlaylistItemsInsert,
  type YoutubePlaylistItemsInsertResponse,
} from './youtube-playlist-items-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlistItems.insert',
  path: '/youtube/v3/playlistItems',
  method: 'post',
  tag: 'playlist-items',
};

export const YOUTUBE_PLAYLIST_ITEMS_INSERT_MOCK: MockEndpoint<YoutubePlaylistItemsInsertResponse> =
  {
    key: 'YOUTUBE_PLAYLIST_ITEMS_INSERT',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubePlaylistItemsInsert,
  };

export function provideYoutubePlaylistItemsInsertMock(
  initialBehavior?: MockEndpointBehavior<YoutubePlaylistItemsInsertResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_PLAYLIST_ITEMS_INSERT_MOCK,
    initialBehavior,
  );
}
