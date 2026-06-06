import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeCaptionsInsertBody = NonNullable<
  paths['/youtube/v3/captions']['post']['requestBody']
>['content']['application/octet-stream'];

export type YoutubeCaptionsInsertResponse =
  paths['/youtube/v3/captions']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_CAPTIONS_INSERT = new InjectionToken<
  (
    body: YoutubeCaptionsInsertBody | Signal<YoutubeCaptionsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeCaptionsInsertResponse>>
>('YOUTUBE_CAPTIONS_INSERT');

export function provideYoutubeCaptionsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_CAPTIONS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeCaptionsInsertBody | Signal<YoutubeCaptionsInsertBody>,
      ) =>
        httpResource<YoutubeCaptionsInsertResponse>(() => ({
          url: `${base}/youtube/v3/captions`,
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
