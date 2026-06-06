import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveStreamsListParams =
  paths['/youtube/v3/liveStreams']['get']['parameters']['query'];

export type YoutubeLiveStreamsListResponse =
  paths['/youtube/v3/liveStreams']['get']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_STREAMS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeLiveStreamsListParams
      | (() => YoutubeLiveStreamsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeLiveStreamsListResponse>>
>('YOUTUBE_LIVE_STREAMS_LIST');

export function provideYoutubeLiveStreamsList(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_STREAMS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeLiveStreamsListParams
          | (() => YoutubeLiveStreamsListParams | undefined),
      ) =>
        httpResource<YoutubeLiveStreamsListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/youtube/v3/liveStreams`,
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
