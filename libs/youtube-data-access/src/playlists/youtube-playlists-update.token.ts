import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubePlaylistsUpdateBody = NonNullable<
  paths['/youtube/v3/playlists']['put']['requestBody']
>['content']['application/json'];

export type YoutubePlaylistsUpdateResponse =
  paths['/youtube/v3/playlists']['put']['responses']['200']['content']['application/json'];

export const YOUTUBE_PLAYLISTS_UPDATE = new InjectionToken<
  (
    body: YoutubePlaylistsUpdateBody | Signal<YoutubePlaylistsUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubePlaylistsUpdateResponse>>
>('YOUTUBE_PLAYLISTS_UPDATE');

export function provideYoutubePlaylistsUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_PLAYLISTS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubePlaylistsUpdateBody | Signal<YoutubePlaylistsUpdateBody>,
      ) =>
        httpResource<YoutubePlaylistsUpdateResponse>(() => ({
          url: `${base}/youtube/v3/playlists`,
          method: 'PUT',
          body,
          headers: {
            ...(oauth2?.() != null
              ? { Authorization: `Bearer ${oauth2()}` }
              : {}),
            ...(oauth2c?.() != null
              ? { Authorization: `Bearer ${oauth2c()}` }
              : {}),
          },
        }));
    },
  };
}
