import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export const YOUTUBE_COMMENTS_MARK_AS_SPAM = new InjectionToken<
  () => Observable<unknown>
>('YOUTUBE_COMMENTS_MARK_AS_SPAM');

export function provideYoutubeCommentsMarkAsSpam(): FactoryProvider {
  return {
    provide: YOUTUBE_COMMENTS_MARK_AS_SPAM,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return () =>
        http.request<unknown>(
          'POST',
          `${base}/youtube/v3/comments/markAsSpam`,
          {
            headers: {
              ...(oauth2?.() != null
                ? { Authorization: `Bearer ${oauth2()}` }
                : {}),
              ...(oauth2c?.() != null
                ? { Authorization: `Bearer ${oauth2c()}` }
                : {}),
            },
          },
        );
    },
  };
}
