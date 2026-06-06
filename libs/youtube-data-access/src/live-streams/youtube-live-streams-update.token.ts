import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveStreamsUpdateBody = NonNullable<
  paths['/youtube/v3/liveStreams']['put']['requestBody']
>['content']['application/json'];

export type YoutubeLiveStreamsUpdateResponse =
  paths['/youtube/v3/liveStreams']['put']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_STREAMS_UPDATE = new InjectionToken<
  (
    body: YoutubeLiveStreamsUpdateBody | Signal<YoutubeLiveStreamsUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubeLiveStreamsUpdateResponse>>
>('YOUTUBE_LIVE_STREAMS_UPDATE');

export function provideYoutubeLiveStreamsUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_STREAMS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveStreamsUpdateBody
          | Signal<YoutubeLiveStreamsUpdateBody>,
      ) =>
        httpResource<YoutubeLiveStreamsUpdateResponse>(() => ({
          url: `${base}/youtube/v3/liveStreams`,
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
