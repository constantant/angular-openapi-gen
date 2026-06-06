import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeWatermarksSetBody = NonNullable<
  paths['/youtube/v3/watermarks/set']['post']['requestBody']
>['content']['application/octet-stream'];

export const YOUTUBE_WATERMARKS_SET = new InjectionToken<
  (
    body: YoutubeWatermarksSetBody | Signal<YoutubeWatermarksSetBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('YOUTUBE_WATERMARKS_SET');

export function provideYoutubeWatermarksSet(): FactoryProvider {
  return {
    provide: YOUTUBE_WATERMARKS_SET,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeWatermarksSetBody | Signal<YoutubeWatermarksSetBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/youtube/v3/watermarks/set`,
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
