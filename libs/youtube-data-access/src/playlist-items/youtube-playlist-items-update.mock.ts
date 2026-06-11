import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLIST_ITEMS_UPDATE } from './youtube-playlist-items-update.token';
import type { YoutubePlaylistItemsUpdateResponse } from './youtube-playlist-items-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlistItems.update',
  path: '/youtube/v3/playlistItems',
  method: 'put',
  tag: 'playlist-items',
};

export function provideYoutubePlaylistItemsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubePlaylistItemsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLIST_ITEMS_UPDATE,
    'YOUTUBE_PLAYLIST_ITEMS_UPDATE',
    initialBehavior,
    _meta,
  );
}
