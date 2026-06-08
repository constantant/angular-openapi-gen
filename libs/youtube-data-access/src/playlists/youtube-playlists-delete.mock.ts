import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLISTS_DELETE } from './youtube-playlists-delete.token';

export function provideYoutubePlaylistsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLISTS_DELETE,
    'YOUTUBE_PLAYLISTS_DELETE',
    initialBehavior,
  );
}
