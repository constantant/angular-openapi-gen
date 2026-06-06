import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeAbuseReportsInsertBody = NonNullable<
  paths['/youtube/v3/abuseReports']['post']['requestBody']
>['content']['application/json'];

export type YoutubeAbuseReportsInsertResponse =
  paths['/youtube/v3/abuseReports']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_ABUSE_REPORTS_INSERT = new InjectionToken<
  (
    body: YoutubeAbuseReportsInsertBody | Signal<YoutubeAbuseReportsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeAbuseReportsInsertResponse>>
>('YOUTUBE_ABUSE_REPORTS_INSERT');

export function provideYoutubeAbuseReportsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_ABUSE_REPORTS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeAbuseReportsInsertBody
          | Signal<YoutubeAbuseReportsInsertBody>,
      ) =>
        httpResource<YoutubeAbuseReportsInsertResponse>(() => ({
          url: `${base}/youtube/v3/abuseReports`,
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
