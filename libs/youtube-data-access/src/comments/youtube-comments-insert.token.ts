import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeCommentsInsertBody = NonNullable<
  paths['/youtube/v3/comments']['post']['requestBody']
>['content']['application/json'];

export type YoutubeCommentsInsertResponse =
  paths['/youtube/v3/comments']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_COMMENTS_INSERT = new InjectionToken<
  (
    body: YoutubeCommentsInsertBody | Signal<YoutubeCommentsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeCommentsInsertResponse>>
>('YOUTUBE_COMMENTS_INSERT');

export function provideYoutubeCommentsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_COMMENTS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeCommentsInsertBody | Signal<YoutubeCommentsInsertBody>,
      ) =>
        httpResource<YoutubeCommentsInsertResponse>(() => ({
          url: `${base}/youtube/v3/comments`,
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
