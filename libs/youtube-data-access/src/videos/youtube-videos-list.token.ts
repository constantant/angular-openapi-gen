import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeVideosListParams =
  paths['/youtube/v3/videos']['get']['parameters']['query'];

export type YoutubeVideosListResponse =
  paths['/youtube/v3/videos']['get']['responses']['200']['content']['application/json'];

export const YOUTUBE_VIDEOS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeVideosListParams
      | (() => YoutubeVideosListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeVideosListResponse>>
>('YOUTUBE_VIDEOS_LIST');

export function provideYoutubeVideosList(): FactoryProvider {
  return {
    provide: YOUTUBE_VIDEOS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeVideosListParams
          | (() => YoutubeVideosListParams | undefined),
      ) =>
        httpResource<YoutubeVideosListResponse>(() => ({
          url: `${base}/youtube/v3/videos`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
          headers: {
            ...(oauth2?.() != null
              ? { Authorization: `Bearer ${oauth2!()}` }
              : {}),
            ...(oauth2c?.() != null
              ? { Authorization: `Bearer ${oauth2c!()}` }
              : {}),
          },
        }));
    },
  };
}
