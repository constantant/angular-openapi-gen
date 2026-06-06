import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeCaptionsDownloadParams =
  paths['/youtube/v3/captions/{id}']['get']['parameters']['query'];

export const YOUTUBE_CAPTIONS_DOWNLOAD = new InjectionToken<
  (
    id: string,
    params?:
      | YoutubeCaptionsDownloadParams
      | (() => YoutubeCaptionsDownloadParams | undefined),
  ) => ReturnType<typeof httpResource<unknown>>
>('YOUTUBE_CAPTIONS_DOWNLOAD');

export function provideYoutubeCaptionsDownload(): FactoryProvider {
  return {
    provide: YOUTUBE_CAPTIONS_DOWNLOAD,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        id: string,
        params?:
          | YoutubeCaptionsDownloadParams
          | (() => YoutubeCaptionsDownloadParams | undefined),
      ) =>
        httpResource<unknown>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/youtube/v3/captions/${id}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
            headers: {
              ...(oauth2?.() != null
                ? { Authorization: `Bearer ${oauth2()}` }
                : {}),
              ...(oauth2c?.() != null
                ? { Authorization: `Bearer ${oauth2c()}` }
                : {}),
            },
          };
        });
    },
  };
}
