import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeVideosInsertBody = NonNullable<
  paths['/youtube/v3/videos']['post']['requestBody']
>['content']['application/octet-stream'];

export type YoutubeVideosInsertResponse =
  paths['/youtube/v3/videos']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_VIDEOS_INSERT = new InjectionToken<
  (
    body: YoutubeVideosInsertBody | Signal<YoutubeVideosInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeVideosInsertResponse>>
>('YOUTUBE_VIDEOS_INSERT');

export function provideYoutubeVideosInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_VIDEOS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeVideosInsertBody | Signal<YoutubeVideosInsertBody>,
      ) =>
        httpResource<YoutubeVideosInsertResponse>(() => ({
          url: `${base}/youtube/v3/videos`,
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
