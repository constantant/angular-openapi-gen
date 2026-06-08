import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLISTS_LIST } from './youtube-playlists-list.token';
import type { YoutubePlaylistsListResponse } from './youtube-playlists-list.token';

export function provideYoutubePlaylistsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubePlaylistsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLISTS_LIST,
    'YOUTUBE_PLAYLISTS_LIST',
    initialBehavior,
  );
}
