import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export const YOUTUBE_LIVE_STREAMS_DELETE = new InjectionToken<
  () => ReturnType<typeof httpResource<unknown>>
>('YOUTUBE_LIVE_STREAMS_DELETE');

export function provideYoutubeLiveStreamsDelete(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_STREAMS_DELETE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return () =>
        httpResource<unknown>(() => ({
          url: `${base}/youtube/v3/liveStreams`,
          method: 'DELETE',
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
