import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeSearchListParams =
  paths['/youtube/v3/search']['get']['parameters']['query'];

export type YoutubeSearchListResponse =
  paths['/youtube/v3/search']['get']['responses']['200']['content']['application/json'];

export const YOUTUBE_SEARCH_LIST = new InjectionToken<
  (
    params?:
      | YoutubeSearchListParams
      | (() => YoutubeSearchListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeSearchListResponse>>
>('YOUTUBE_SEARCH_LIST');

export function provideYoutubeSearchList(): FactoryProvider {
  return {
    provide: YOUTUBE_SEARCH_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeSearchListParams
          | (() => YoutubeSearchListParams | undefined),
      ) =>
        httpResource<YoutubeSearchListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/youtube/v3/search`,
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
