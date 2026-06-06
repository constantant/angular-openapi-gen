import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveBroadcastsUpdateBody = NonNullable<
  paths['/youtube/v3/liveBroadcasts']['put']['requestBody']
>['content']['application/json'];

export type YoutubeLiveBroadcastsUpdateResponse =
  paths['/youtube/v3/liveBroadcasts']['put']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_BROADCASTS_UPDATE = new InjectionToken<
  (
    body:
      | YoutubeLiveBroadcastsUpdateBody
      | Signal<YoutubeLiveBroadcastsUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubeLiveBroadcastsUpdateResponse>>
>('YOUTUBE_LIVE_BROADCASTS_UPDATE');

export function provideYoutubeLiveBroadcastsUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_BROADCASTS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveBroadcastsUpdateBody
          | Signal<YoutubeLiveBroadcastsUpdateBody>,
      ) =>
        httpResource<YoutubeLiveBroadcastsUpdateResponse>(() => ({
          url: `${base}/youtube/v3/liveBroadcasts`,
          method: 'PUT',
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
