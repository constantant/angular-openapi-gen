import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeWatermarksSetParams =
  paths['/youtube/v3/watermarks/set']['post']['parameters']['query'];

export type YoutubeWatermarksSetBody = Blob | ArrayBuffer;

export const YOUTUBE_WATERMARKS_SET = new InjectionToken<
  (
    body: YoutubeWatermarksSetBody,
    params: YoutubeWatermarksSetParams,
  ) => Observable<unknown>
>('YOUTUBE_WATERMARKS_SET');

export function provideYoutubeWatermarksSet(): FactoryProvider {
  return {
    provide: YOUTUBE_WATERMARKS_SET,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeWatermarksSetBody,
        params: YoutubeWatermarksSetParams,
      ) =>
        http.request<unknown>('POST', `${base}/youtube/v3/watermarks/set`, {
          params: params as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
          body,
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
