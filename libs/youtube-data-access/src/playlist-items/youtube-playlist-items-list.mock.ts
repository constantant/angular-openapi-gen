import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubePlaylistItemsList,
  type YoutubePlaylistItemsListResponse,
} from './youtube-playlist-items-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlistItems.list',
  path: '/youtube/v3/playlistItems',
  method: 'get',
  tag: 'playlist-items',
};

export const YOUTUBE_PLAYLIST_ITEMS_LIST_MOCK: MockEndpoint<YoutubePlaylistItemsListResponse> =
  {
    key: 'YOUTUBE_PLAYLIST_ITEMS_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubePlaylistItemsList,
  };

export function provideYoutubePlaylistItemsListMock(
  initialBehavior?: MockEndpointBehavior<YoutubePlaylistItemsListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_PLAYLIST_ITEMS_LIST_MOCK, initialBehavior);
}
