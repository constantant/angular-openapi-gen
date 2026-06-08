import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLIST_ITEMS_UPDATE } from './youtube-playlist-items-update.token';
import type { YoutubePlaylistItemsUpdateResponse } from './youtube-playlist-items-update.token';

export function provideYoutubePlaylistItemsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubePlaylistItemsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLIST_ITEMS_UPDATE,
    'YOUTUBE_PLAYLIST_ITEMS_UPDATE',
    initialBehavior,
  );
}
