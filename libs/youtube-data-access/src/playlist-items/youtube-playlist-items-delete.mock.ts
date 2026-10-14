import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { provideYoutubePlaylistItemsDelete } from './youtube-playlist-items-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlistItems.delete',
  path: '/youtube/v3/playlistItems',
  method: 'delete',
  tag: 'playlist-items',
};

export const YOUTUBE_PLAYLIST_ITEMS_DELETE_MOCK: MockEndpoint<unknown> = {
  key: 'YOUTUBE_PLAYLIST_ITEMS_DELETE',
  baseUrl: YOUTUBE_BASE_URL,
  meta: _meta,
  provide: provideYoutubePlaylistItemsDelete,
};

export function provideYoutubePlaylistItemsDeleteMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_PLAYLIST_ITEMS_DELETE_MOCK,
    initialBehavior,
  );
}
