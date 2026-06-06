import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveChatModeratorsInsertBody = NonNullable<
  paths['/youtube/v3/liveChat/moderators']['post']['requestBody']
>['content']['application/json'];

export type YoutubeLiveChatModeratorsInsertResponse =
  paths['/youtube/v3/liveChat/moderators']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_CHAT_MODERATORS_INSERT = new InjectionToken<
  (
    body:
      | YoutubeLiveChatModeratorsInsertBody
      | Signal<YoutubeLiveChatModeratorsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeLiveChatModeratorsInsertResponse>>
>('YOUTUBE_LIVE_CHAT_MODERATORS_INSERT');

export function provideYoutubeLiveChatModeratorsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_CHAT_MODERATORS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveChatModeratorsInsertBody
          | Signal<YoutubeLiveChatModeratorsInsertBody>,
      ) =>
        httpResource<YoutubeLiveChatModeratorsInsertResponse>(() => ({
          url: `${base}/youtube/v3/liveChat/moderators`,
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
