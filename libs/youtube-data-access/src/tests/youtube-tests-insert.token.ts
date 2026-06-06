import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeTestsInsertBody = NonNullable<
  paths['/youtube/v3/tests']['post']['requestBody']
>['content']['application/json'];

export type YoutubeTestsInsertResponse =
  paths['/youtube/v3/tests']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_TESTS_INSERT = new InjectionToken<
  (
    body: YoutubeTestsInsertBody | Signal<YoutubeTestsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeTestsInsertResponse>>
>('YOUTUBE_TESTS_INSERT');

export function provideYoutubeTestsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_TESTS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (body: YoutubeTestsInsertBody | Signal<YoutubeTestsInsertBody>) =>
        httpResource<YoutubeTestsInsertResponse>(() => ({
          url: `${base}/youtube/v3/tests`,
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
