import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeCommentsUpdateBody = NonNullable<
  paths['/youtube/v3/comments']['put']['requestBody']
>['content']['application/json'];

export type YoutubeCommentsUpdateResponse =
  paths['/youtube/v3/comments']['put']['responses']['200']['content']['application/json'];

export const YOUTUBE_COMMENTS_UPDATE = new InjectionToken<
  (
    body: YoutubeCommentsUpdateBody | Signal<YoutubeCommentsUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubeCommentsUpdateResponse>>
>('YOUTUBE_COMMENTS_UPDATE');

export function provideYoutubeCommentsUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_COMMENTS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeCommentsUpdateBody | Signal<YoutubeCommentsUpdateBody>,
      ) =>
        httpResource<YoutubeCommentsUpdateResponse>(() => ({
          url: `${base}/youtube/v3/comments`,
          method: 'PUT',
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
