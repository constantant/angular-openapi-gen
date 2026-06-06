import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeSubscriptionsInsertBody = NonNullable<
  paths['/youtube/v3/subscriptions']['post']['requestBody']
>['content']['application/json'];

export type YoutubeSubscriptionsInsertResponse =
  paths['/youtube/v3/subscriptions']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_SUBSCRIPTIONS_INSERT = new InjectionToken<
  (
    body:
      | YoutubeSubscriptionsInsertBody
      | Signal<YoutubeSubscriptionsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeSubscriptionsInsertResponse>>
>('YOUTUBE_SUBSCRIPTIONS_INSERT');

export function provideYoutubeSubscriptionsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_SUBSCRIPTIONS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeSubscriptionsInsertBody
          | Signal<YoutubeSubscriptionsInsertBody>,
      ) =>
        httpResource<YoutubeSubscriptionsInsertResponse>(() => ({
          url: `${base}/youtube/v3/subscriptions`,
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
