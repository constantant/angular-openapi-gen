import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveBroadcastsBindResponse =
  paths['/youtube/v3/liveBroadcasts/bind']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_BROADCASTS_BIND = new InjectionToken<
  () => ReturnType<typeof httpResource<YoutubeLiveBroadcastsBindResponse>>
>('YOUTUBE_LIVE_BROADCASTS_BIND');

export function provideYoutubeLiveBroadcastsBind(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_BROADCASTS_BIND,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return () =>
        httpResource<YoutubeLiveBroadcastsBindResponse>(() => ({
          url: `${base}/youtube/v3/liveBroadcasts/bind`,
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
