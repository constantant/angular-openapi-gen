import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLIST_ITEMS_DELETE } from './youtube-playlist-items-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlistItems.delete',
  path: '/youtube/v3/playlistItems',
  method: 'delete',
  tag: 'playlist-items',
};

export function provideYoutubePlaylistItemsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLIST_ITEMS_DELETE,
    'YOUTUBE_PLAYLIST_ITEMS_DELETE',
    initialBehavior,
    _meta,
  );
}
