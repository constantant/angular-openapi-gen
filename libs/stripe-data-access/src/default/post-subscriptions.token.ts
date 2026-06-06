import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSubscriptionsBody = NonNullable<
  paths['/v1/subscriptions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSubscriptionsResponse =
  paths['/v1/subscriptions']['post']['responses']['200']['content']['application/json'];

export const POST_SUBSCRIPTIONS = new InjectionToken<
  (
    body: PostSubscriptionsBody | Signal<PostSubscriptionsBody>,
  ) => ReturnType<typeof httpResource<PostSubscriptionsResponse>>
>('POST_SUBSCRIPTIONS');

export function providePostSubscriptions(): FactoryProvider {
  return {
    provide: POST_SUBSCRIPTIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostSubscriptionsBody | Signal<PostSubscriptionsBody>) =>
        httpResource<PostSubscriptionsResponse>(() => ({
          url: `${base}/v1/subscriptions`,
          method: 'POST',
          body,
        }));
    },
  };
}
