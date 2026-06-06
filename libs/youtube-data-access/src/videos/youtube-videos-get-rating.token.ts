import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeVideosGetRatingParams =
  paths['/youtube/v3/videos/getRating']['get']['parameters']['query'];

export type YoutubeVideosGetRatingResponse =
  paths['/youtube/v3/videos/getRating']['get']['responses']['200']['content']['application/json'];

export const YOUTUBE_VIDEOS_GET_RATING = new InjectionToken<
  (
    params?:
      | YoutubeVideosGetRatingParams
      | (() => YoutubeVideosGetRatingParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeVideosGetRatingResponse>>
>('YOUTUBE_VIDEOS_GET_RATING');

export function provideYoutubeVideosGetRating(): FactoryProvider {
  return {
    provide: YOUTUBE_VIDEOS_GET_RATING,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeVideosGetRatingParams
          | (() => YoutubeVideosGetRatingParams | undefined),
      ) =>
        httpResource<YoutubeVideosGetRatingResponse>(() => ({
          url: `${base}/youtube/v3/videos/getRating`,
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
