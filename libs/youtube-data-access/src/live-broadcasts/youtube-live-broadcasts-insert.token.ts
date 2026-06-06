import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveBroadcastsInsertBody = NonNullable<
  paths['/youtube/v3/liveBroadcasts']['post']['requestBody']
>['content']['application/json'];

export type YoutubeLiveBroadcastsInsertResponse =
  paths['/youtube/v3/liveBroadcasts']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_BROADCASTS_INSERT = new InjectionToken<
  (
    body:
      | YoutubeLiveBroadcastsInsertBody
      | Signal<YoutubeLiveBroadcastsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeLiveBroadcastsInsertResponse>>
>('YOUTUBE_LIVE_BROADCASTS_INSERT');

export function provideYoutubeLiveBroadcastsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_BROADCASTS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveBroadcastsInsertBody
          | Signal<YoutubeLiveBroadcastsInsertBody>,
      ) =>
        httpResource<YoutubeLiveBroadcastsInsertResponse>(() => ({
          url: `${base}/youtube/v3/liveBroadcasts`,
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
