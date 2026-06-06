import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveBroadcastsInsertCuepointBody = NonNullable<
  paths['/youtube/v3/liveBroadcasts/cuepoint']['post']['requestBody']
>['content']['application/json'];

export type YoutubeLiveBroadcastsInsertCuepointResponse =
  paths['/youtube/v3/liveBroadcasts/cuepoint']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT = new InjectionToken<
  (
    body:
      | YoutubeLiveBroadcastsInsertCuepointBody
      | Signal<YoutubeLiveBroadcastsInsertCuepointBody>,
  ) => ReturnType<
    typeof httpResource<YoutubeLiveBroadcastsInsertCuepointResponse>
  >
>('YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT');

export function provideYoutubeLiveBroadcastsInsertCuepoint(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveBroadcastsInsertCuepointBody
          | Signal<YoutubeLiveBroadcastsInsertCuepointBody>,
      ) =>
        httpResource<YoutubeLiveBroadcastsInsertCuepointResponse>(() => ({
          url: `${base}/youtube/v3/liveBroadcasts/cuepoint`,
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
