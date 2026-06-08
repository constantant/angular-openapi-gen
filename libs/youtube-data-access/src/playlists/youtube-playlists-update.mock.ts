import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLISTS_UPDATE } from './youtube-playlists-update.token';
import type { YoutubePlaylistsUpdateResponse } from './youtube-playlists-update.token';

export function provideYoutubePlaylistsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubePlaylistsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLISTS_UPDATE,
    'YOUTUBE_PLAYLISTS_UPDATE',
    initialBehavior,
  );
}
