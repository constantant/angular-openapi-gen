import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeCaptionsDownloadParams =
  paths['/youtube/v3/captions/{id}']['get']['parameters']['query'];

export const YOUTUBE_CAPTIONS_DOWNLOAD = new InjectionToken<
  (id: string, params?: YoutubeCaptionsDownloadParams) => Observable<unknown>
>('YOUTUBE_CAPTIONS_DOWNLOAD');

export function provideYoutubeCaptionsDownload(): FactoryProvider {
  return {
    provide: YOUTUBE_CAPTIONS_DOWNLOAD,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (id: string, params?: YoutubeCaptionsDownloadParams) =>
        http.request<unknown>('GET', `${base}/youtube/v3/captions/${id}`, {
          params: params as unknown as Record<
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
        });
    },
  };
}
