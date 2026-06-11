import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLISTS_DELETE } from './youtube-playlists-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlists.delete',
  path: '/youtube/v3/playlists',
  method: 'delete',
  tag: 'playlists',
};

export function provideYoutubePlaylistsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLISTS_DELETE,
    'YOUTUBE_PLAYLISTS_DELETE',
    initialBehavior,
    _meta,
  );
}
