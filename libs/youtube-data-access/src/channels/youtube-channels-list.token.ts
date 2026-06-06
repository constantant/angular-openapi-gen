import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeChannelsListParams =
  paths['/youtube/v3/channels']['get']['parameters']['query'];

export type YoutubeChannelsListResponse =
  paths['/youtube/v3/channels']['get']['responses']['200']['content']['application/json'];

export const YOUTUBE_CHANNELS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeChannelsListParams
      | (() => YoutubeChannelsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeChannelsListResponse>>
>('YOUTUBE_CHANNELS_LIST');

export function provideYoutubeChannelsList(): FactoryProvider {
  return {
    provide: YOUTUBE_CHANNELS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeChannelsListParams
          | (() => YoutubeChannelsListParams | undefined),
      ) =>
        httpResource<YoutubeChannelsListResponse>(() => ({
          url: `${base}/youtube/v3/channels`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
          headers: {
            ...(oauth2 != null ? { Authorization: `Bearer ${oauth2}` } : {}),
            ...(oauth2c != null ? { Authorization: `Bearer ${oauth2c}` } : {}),
          },
        }));
    },
  };
}
