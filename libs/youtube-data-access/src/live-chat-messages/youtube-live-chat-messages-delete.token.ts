import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export const YOUTUBE_LIVE_CHAT_MESSAGES_DELETE = new InjectionToken<
  () => Observable<unknown>
>('YOUTUBE_LIVE_CHAT_MESSAGES_DELETE');

export function provideYoutubeLiveChatMessagesDelete(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_CHAT_MESSAGES_DELETE,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return () =>
        http.request<unknown>(
          'DELETE',
          `${base}/youtube/v3/liveChat/messages`,
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
