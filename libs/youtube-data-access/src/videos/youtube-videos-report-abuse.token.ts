import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeVideosReportAbuseParams =
  paths['/youtube/v3/videos/reportAbuse']['post']['parameters']['query'];

export type YoutubeVideosReportAbuseBody = NonNullable<
  paths['/youtube/v3/videos/reportAbuse']['post']['requestBody']
>['content']['application/json'];

export const YOUTUBE_VIDEOS_REPORT_ABUSE = new InjectionToken<
  (
    body: YoutubeVideosReportAbuseBody,
    params?: YoutubeVideosReportAbuseParams,
  ) => Observable<unknown>
>('YOUTUBE_VIDEOS_REPORT_ABUSE');

export function provideYoutubeVideosReportAbuse(): FactoryProvider {
  return {
    provide: YOUTUBE_VIDEOS_REPORT_ABUSE,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeVideosReportAbuseBody,
        params?: YoutubeVideosReportAbuseParams,
      ) =>
        http.request<unknown>('POST', `${base}/youtube/v3/videos/reportAbuse`, {
          params: params as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
          body,
          headers: {
            ...(oauth2?.() != null
              ? { Authorization: `Bearer ${oauth2()}` }
              : {}),
            ...(oauth2c?.() != null
              ? { Authorization: `Bearer ${oauth2c()}` }
              : {}),
          },
        });
    },
  };
}
