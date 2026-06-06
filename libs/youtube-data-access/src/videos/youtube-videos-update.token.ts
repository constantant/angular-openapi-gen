import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeVideosUpdateBody = NonNullable<
  paths['/youtube/v3/videos']['put']['requestBody']
>['content']['application/json'];

export type YoutubeVideosUpdateResponse =
  paths['/youtube/v3/videos']['put']['responses']['200']['content']['application/json'];

export const YOUTUBE_VIDEOS_UPDATE = new InjectionToken<
  (
    body: YoutubeVideosUpdateBody | Signal<YoutubeVideosUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubeVideosUpdateResponse>>
>('YOUTUBE_VIDEOS_UPDATE');

export function provideYoutubeVideosUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_VIDEOS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeVideosUpdateBody | Signal<YoutubeVideosUpdateBody>,
      ) =>
        httpResource<YoutubeVideosUpdateResponse>(() => ({
          url: `${base}/youtube/v3/videos`,
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
