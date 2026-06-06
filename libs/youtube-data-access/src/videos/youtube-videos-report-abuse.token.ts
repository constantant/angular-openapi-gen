import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeVideosReportAbuseBody = NonNullable<
  paths['/youtube/v3/videos/reportAbuse']['post']['requestBody']
>['content']['application/json'];

export const YOUTUBE_VIDEOS_REPORT_ABUSE = new InjectionToken<
  (
    body: YoutubeVideosReportAbuseBody | Signal<YoutubeVideosReportAbuseBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('YOUTUBE_VIDEOS_REPORT_ABUSE');

export function provideYoutubeVideosReportAbuse(): FactoryProvider {
  return {
    provide: YOUTUBE_VIDEOS_REPORT_ABUSE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeVideosReportAbuseBody
          | Signal<YoutubeVideosReportAbuseBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/youtube/v3/videos/reportAbuse`,
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
