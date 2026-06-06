import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeCaptionsUpdateBody = NonNullable<
  paths['/youtube/v3/captions']['put']['requestBody']
>['content']['application/octet-stream'];

export type YoutubeCaptionsUpdateResponse =
  paths['/youtube/v3/captions']['put']['responses']['200']['content']['application/json'];

export const YOUTUBE_CAPTIONS_UPDATE = new InjectionToken<
  (
    body: YoutubeCaptionsUpdateBody | Signal<YoutubeCaptionsUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubeCaptionsUpdateResponse>>
>('YOUTUBE_CAPTIONS_UPDATE');

export function provideYoutubeCaptionsUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_CAPTIONS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeCaptionsUpdateBody | Signal<YoutubeCaptionsUpdateBody>,
      ) =>
        httpResource<YoutubeCaptionsUpdateResponse>(() => ({
          url: `${base}/youtube/v3/captions`,
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
