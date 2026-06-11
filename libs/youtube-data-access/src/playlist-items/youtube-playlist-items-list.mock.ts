import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLIST_ITEMS_LIST } from './youtube-playlist-items-list.token';
import type { YoutubePlaylistItemsListResponse } from './youtube-playlist-items-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlistItems.list',
  path: '/youtube/v3/playlistItems',
  method: 'get',
  tag: 'playlist-items',
};

export function provideYoutubePlaylistItemsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubePlaylistItemsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLIST_ITEMS_LIST,
    'YOUTUBE_PLAYLIST_ITEMS_LIST',
    initialBehavior,
    _meta,
  );
}
