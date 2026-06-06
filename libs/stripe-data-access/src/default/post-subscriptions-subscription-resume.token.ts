import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSubscriptionsSubscriptionResumeBody = NonNullable<
  paths['/v1/subscriptions/{subscription}/resume']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSubscriptionsSubscriptionResumeResponse =
  paths['/v1/subscriptions/{subscription}/resume']['post']['responses']['200']['content']['application/json'];

export const POST_SUBSCRIPTIONS_SUBSCRIPTION_RESUME = new InjectionToken<
  (
    subscription: string,
    body:
      | PostSubscriptionsSubscriptionResumeBody
      | Signal<PostSubscriptionsSubscriptionResumeBody>,
  ) => ReturnType<
    typeof httpResource<PostSubscriptionsSubscriptionResumeResponse>
  >
>('POST_SUBSCRIPTIONS_SUBSCRIPTION_RESUME');

export function providePostSubscriptionsSubscriptionResume(): FactoryProvider {
  return {
    provide: POST_SUBSCRIPTIONS_SUBSCRIPTION_RESUME,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        subscription: string,
        body:
          | PostSubscriptionsSubscriptionResumeBody
          | Signal<PostSubscriptionsSubscriptionResumeBody>,
      ) =>
        httpResource<PostSubscriptionsSubscriptionResumeResponse>(() => ({
          url: `${base}/v1/subscriptions/${subscription}/resume`,
          method: 'POST',
          body,
        }));
    },
  };
}
