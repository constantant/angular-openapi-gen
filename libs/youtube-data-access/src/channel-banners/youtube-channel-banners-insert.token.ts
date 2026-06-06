import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeChannelBannersInsertBody = NonNullable<
  paths['/youtube/v3/channelBanners/insert']['post']['requestBody']
>['content']['application/octet-stream'];

export type YoutubeChannelBannersInsertResponse =
  paths['/youtube/v3/channelBanners/insert']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_CHANNEL_BANNERS_INSERT = new InjectionToken<
  (
    body:
      | YoutubeChannelBannersInsertBody
      | Signal<YoutubeChannelBannersInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeChannelBannersInsertResponse>>
>('YOUTUBE_CHANNEL_BANNERS_INSERT');

export function provideYoutubeChannelBannersInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_CHANNEL_BANNERS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeChannelBannersInsertBody
          | Signal<YoutubeChannelBannersInsertBody>,
      ) =>
        httpResource<YoutubeChannelBannersInsertResponse>(() => ({
          url: `${base}/youtube/v3/channelBanners/insert`,
          method: 'POST',
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
