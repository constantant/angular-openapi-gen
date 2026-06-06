import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveStreamsInsertBody = NonNullable<
  paths['/youtube/v3/liveStreams']['post']['requestBody']
>['content']['application/json'];

export type YoutubeLiveStreamsInsertResponse =
  paths['/youtube/v3/liveStreams']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_LIVE_STREAMS_INSERT = new InjectionToken<
  (
    body: YoutubeLiveStreamsInsertBody | Signal<YoutubeLiveStreamsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeLiveStreamsInsertResponse>>
>('YOUTUBE_LIVE_STREAMS_INSERT');

export function provideYoutubeLiveStreamsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_STREAMS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveStreamsInsertBody
          | Signal<YoutubeLiveStreamsInsertBody>,
      ) =>
        httpResource<YoutubeLiveStreamsInsertResponse>(() => ({
          url: `${base}/youtube/v3/liveStreams`,
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
