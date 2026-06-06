import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveChatBansInsertBody = NonNullable<
  paths['/youtube/v3/liveChat/bans']['post']['requestBody']
>['content']['application/json'];

export type YoutubeLiveChatBansInsertResponse =
  paths['/youtube/v3/liveChat/bans']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_CHAT_BANS_INSERT = new InjectionToken<
  (
    body: YoutubeLiveChatBansInsertBody | Signal<YoutubeLiveChatBansInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeLiveChatBansInsertResponse>>
>('YOUTUBE_LIVE_CHAT_BANS_INSERT');

export function provideYoutubeLiveChatBansInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_CHAT_BANS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveChatBansInsertBody
          | Signal<YoutubeLiveChatBansInsertBody>,
      ) =>
        httpResource<YoutubeLiveChatBansInsertResponse>(() => ({
          url: `${base}/youtube/v3/liveChat/bans`,
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
