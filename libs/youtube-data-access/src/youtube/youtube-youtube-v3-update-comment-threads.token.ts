import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';

export type YoutubeYoutubeV3UpdateCommentThreadsBody = NonNullable<
  paths['/youtube/v3/commentThreads']['put']['requestBody']
>['content']['application/json'];

export type YoutubeYoutubeV3UpdateCommentThreadsResponse =
  paths['/youtube/v3/commentThreads']['put']['responses']['200']['content']['application/json'];

export const YOUTUBE_YOUTUBE_V3_UPDATE_COMMENT_THREADS = new InjectionToken<
  (
    body:
      | YoutubeYoutubeV3UpdateCommentThreadsBody
      | Signal<YoutubeYoutubeV3UpdateCommentThreadsBody>,
  ) => ReturnType<
    typeof httpResource<YoutubeYoutubeV3UpdateCommentThreadsResponse>
  >
>('YOUTUBE_YOUTUBE_V3_UPDATE_COMMENT_THREADS');

export function provideYoutubeYoutubeV3UpdateCommentThreads(): FactoryProvider {
  return {
    provide: YOUTUBE_YOUTUBE_V3_UPDATE_COMMENT_THREADS,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      return (
        body:
          | YoutubeYoutubeV3UpdateCommentThreadsBody
          | Signal<YoutubeYoutubeV3UpdateCommentThreadsBody>,
      ) =>
        httpResource<YoutubeYoutubeV3UpdateCommentThreadsResponse>(() => ({
          url: `${base}/youtube/v3/commentThreads`,
          method: 'PUT',
          body,
        }));
    },
  };
}
