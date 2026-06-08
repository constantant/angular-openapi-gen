import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLIST_ITEMS_DELETE } from './youtube-playlist-items-delete.token';

export function provideYoutubePlaylistItemsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLIST_ITEMS_DELETE,
    'YOUTUBE_PLAYLIST_ITEMS_DELETE',
    initialBehavior,
  );
}
