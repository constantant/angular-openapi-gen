import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveBroadcastsListParams =
  paths['/youtube/v3/liveBroadcasts']['get']['parameters']['query'];

export type YoutubeLiveBroadcastsListResponse =
  paths['/youtube/v3/liveBroadcasts']['get']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_BROADCASTS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeLiveBroadcastsListParams
      | (() => YoutubeLiveBroadcastsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeLiveBroadcastsListResponse>>
>('YOUTUBE_LIVE_BROADCASTS_LIST');

export function provideYoutubeLiveBroadcastsList(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_BROADCASTS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeLiveBroadcastsListParams
          | (() => YoutubeLiveBroadcastsListParams | undefined),
      ) =>
        httpResource<YoutubeLiveBroadcastsListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/youtube/v3/liveBroadcasts`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
            headers: {
              ...(oauth2?.() != null
                ? { Authorization: `Bearer ${oauth2()}` }
                : {}),
              ...(oauth2c?.() != null
                ? { Authorization: `Bearer ${oauth2c()}` }
                : {}),
            },
          };
        });
    },
  };
}
