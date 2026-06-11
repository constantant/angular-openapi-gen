import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_PLAYLISTS_INSERT } from './youtube-playlists-insert.token';
import type { YoutubePlaylistsInsertResponse } from './youtube-playlists-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.playlists.insert',
  path: '/youtube/v3/playlists',
  method: 'post',
  tag: 'playlists',
};

export function provideYoutubePlaylistsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubePlaylistsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_PLAYLISTS_INSERT,
    'YOUTUBE_PLAYLISTS_INSERT',
    initialBehavior,
    _meta,
  );
}
