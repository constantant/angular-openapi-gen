import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLIST_ITEMS_INSERT } from './youtube-playlist-items-insert.token';
import type { YoutubePlaylistItemsInsertResponse } from './youtube-playlist-items-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlistItems.insert',
  path: '/youtube/v3/playlistItems',
  method: 'post',
  tag: 'playlist-items',
};

export function provideYoutubePlaylistItemsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubePlaylistItemsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLIST_ITEMS_INSERT,
    'YOUTUBE_PLAYLIST_ITEMS_INSERT',
    initialBehavior,
    _meta,
  );
}
