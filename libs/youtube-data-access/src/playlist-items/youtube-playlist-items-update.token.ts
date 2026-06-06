import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubePlaylistItemsUpdateBody = NonNullable<
  paths['/youtube/v3/playlistItems']['put']['requestBody']
>['content']['application/json'];

export type YoutubePlaylistItemsUpdateResponse =
  paths['/youtube/v3/playlistItems']['put']['responses']['200']['content']['application/json'];

export const YOUTUBE_PLAYLIST_ITEMS_UPDATE = new InjectionToken<
  (
    body:
      | YoutubePlaylistItemsUpdateBody
      | Signal<YoutubePlaylistItemsUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubePlaylistItemsUpdateResponse>>
>('YOUTUBE_PLAYLIST_ITEMS_UPDATE');

export function provideYoutubePlaylistItemsUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_PLAYLIST_ITEMS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubePlaylistItemsUpdateBody
          | Signal<YoutubePlaylistItemsUpdateBody>,
      ) =>
        httpResource<YoutubePlaylistItemsUpdateResponse>(() => ({
          url: `${base}/youtube/v3/playlistItems`,
          method: 'PUT',
          body,
          headers: {
            ...(oauth2 != null ? { Authorization: `Bearer ${oauth2}` } : {}),
            ...(oauth2c != null ? { Authorization: `Bearer ${oauth2c}` } : {}),
          },
        }));
    },
  };
}
