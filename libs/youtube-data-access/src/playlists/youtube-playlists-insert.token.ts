import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubePlaylistsInsertBody = NonNullable<
  paths['/youtube/v3/playlists']['post']['requestBody']
>['content']['application/json'];

export type YoutubePlaylistsInsertResponse =
  paths['/youtube/v3/playlists']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_PLAYLISTS_INSERT = new InjectionToken<
  (
    body: YoutubePlaylistsInsertBody | Signal<YoutubePlaylistsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubePlaylistsInsertResponse>>
>('YOUTUBE_PLAYLISTS_INSERT');

export function provideYoutubePlaylistsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_PLAYLISTS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubePlaylistsInsertBody | Signal<YoutubePlaylistsInsertBody>,
      ) =>
        httpResource<YoutubePlaylistsInsertResponse>(() => ({
          url: `${base}/youtube/v3/playlists`,
          method: 'POST',
          body,
          headers: {
            ...(oauth2 != null ? { Authorization: `Bearer ${oauth2}` } : {}),
            ...(oauth2c != null ? { Authorization: `Bearer ${oauth2c}` } : {}),
          },
        }));
    },
  };
}
