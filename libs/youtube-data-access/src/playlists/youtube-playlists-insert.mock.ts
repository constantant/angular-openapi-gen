import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLISTS_INSERT } from './youtube-playlists-insert.token';
import type { YoutubePlaylistsInsertResponse } from './youtube-playlists-insert.token';

export function provideYoutubePlaylistsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubePlaylistsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLISTS_INSERT,
    'YOUTUBE_PLAYLISTS_INSERT',
    initialBehavior,
  );
}
