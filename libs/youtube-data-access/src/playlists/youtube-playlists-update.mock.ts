import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLISTS_UPDATE } from './youtube-playlists-update.token';
import type { YoutubePlaylistsUpdateResponse } from './youtube-playlists-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlists.update',
  path: '/youtube/v3/playlists',
  method: 'put',
  tag: 'playlists',
};

export function provideYoutubePlaylistsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubePlaylistsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLISTS_UPDATE,
    'YOUTUBE_PLAYLISTS_UPDATE',
    initialBehavior,
    _meta,
  );
}
