import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveChatModeratorsDeleteParams =
  paths['/youtube/v3/liveChat/moderators']['delete']['parameters']['query'];

export const YOUTUBE_LIVE_CHAT_MODERATORS_DELETE = new InjectionToken<
  (params: YoutubeLiveChatModeratorsDeleteParams) => Observable<unknown>
>('YOUTUBE_LIVE_CHAT_MODERATORS_DELETE');

export function provideYoutubeLiveChatModeratorsDelete(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_CHAT_MODERATORS_DELETE,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (params: YoutubeLiveChatModeratorsDeleteParams) =>
        http.request<unknown>(
          'DELETE',
          `${base}/youtube/v3/liveChat/moderators`,
          {
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
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
