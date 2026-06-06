import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubePlaylistItemsInsertBody = NonNullable<
  paths['/youtube/v3/playlistItems']['post']['requestBody']
>['content']['application/json'];

export type YoutubePlaylistItemsInsertResponse =
  paths['/youtube/v3/playlistItems']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_PLAYLIST_ITEMS_INSERT = new InjectionToken<
  (
    body:
      | YoutubePlaylistItemsInsertBody
      | Signal<YoutubePlaylistItemsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubePlaylistItemsInsertResponse>>
>('YOUTUBE_PLAYLIST_ITEMS_INSERT');

export function provideYoutubePlaylistItemsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_PLAYLIST_ITEMS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubePlaylistItemsInsertBody
          | Signal<YoutubePlaylistItemsInsertBody>,
      ) =>
        httpResource<YoutubePlaylistItemsInsertResponse>(() => ({
          url: `${base}/youtube/v3/playlistItems`,
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
