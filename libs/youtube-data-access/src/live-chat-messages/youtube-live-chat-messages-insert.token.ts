import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveChatMessagesInsertBody = NonNullable<
  paths['/youtube/v3/liveChat/messages']['post']['requestBody']
>['content']['application/json'];

export type YoutubeLiveChatMessagesInsertResponse =
  paths['/youtube/v3/liveChat/messages']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_CHAT_MESSAGES_INSERT = new InjectionToken<
  (
    body:
      | YoutubeLiveChatMessagesInsertBody
      | Signal<YoutubeLiveChatMessagesInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeLiveChatMessagesInsertResponse>>
>('YOUTUBE_LIVE_CHAT_MESSAGES_INSERT');

export function provideYoutubeLiveChatMessagesInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_CHAT_MESSAGES_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveChatMessagesInsertBody
          | Signal<YoutubeLiveChatMessagesInsertBody>,
      ) =>
        httpResource<YoutubeLiveChatMessagesInsertResponse>(() => ({
          url: `${base}/youtube/v3/liveChat/messages`,
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
