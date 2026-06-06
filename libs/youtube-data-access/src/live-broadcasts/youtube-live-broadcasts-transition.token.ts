import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveBroadcastsTransitionResponse =
  paths['/youtube/v3/liveBroadcasts/transition']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_BROADCASTS_TRANSITION = new InjectionToken<
  () => ReturnType<typeof httpResource<YoutubeLiveBroadcastsTransitionResponse>>
>('YOUTUBE_LIVE_BROADCASTS_TRANSITION');

export function provideYoutubeLiveBroadcastsTransition(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_BROADCASTS_TRANSITION,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return () =>
        httpResource<YoutubeLiveBroadcastsTransitionResponse>(() => ({
          url: `${base}/youtube/v3/liveBroadcasts/transition`,
          method: 'POST',
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
