import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeCommentThreadsInsertBody = NonNullable<
  paths['/youtube/v3/commentThreads']['post']['requestBody']
>['content']['application/json'];

export type YoutubeCommentThreadsInsertResponse =
  paths['/youtube/v3/commentThreads']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_COMMENT_THREADS_INSERT = new InjectionToken<
  (
    body:
      | YoutubeCommentThreadsInsertBody
      | Signal<YoutubeCommentThreadsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeCommentThreadsInsertResponse>>
>('YOUTUBE_COMMENT_THREADS_INSERT');

export function provideYoutubeCommentThreadsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_COMMENT_THREADS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeCommentThreadsInsertBody
          | Signal<YoutubeCommentThreadsInsertBody>,
      ) =>
        httpResource<YoutubeCommentThreadsInsertResponse>(() => ({
          url: `${base}/youtube/v3/commentThreads`,
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
