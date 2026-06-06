import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSubscriptionsSubscriptionMigrateBody = NonNullable<
  paths['/v1/subscriptions/{subscription}/migrate']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSubscriptionsSubscriptionMigrateResponse =
  paths['/v1/subscriptions/{subscription}/migrate']['post']['responses']['200']['content']['application/json'];

export const POST_SUBSCRIPTIONS_SUBSCRIPTION_MIGRATE = new InjectionToken<
  (
    subscription: string,
    body:
      | PostSubscriptionsSubscriptionMigrateBody
      | Signal<PostSubscriptionsSubscriptionMigrateBody>,
  ) => ReturnType<
    typeof httpResource<PostSubscriptionsSubscriptionMigrateResponse>
  >
>('POST_SUBSCRIPTIONS_SUBSCRIPTION_MIGRATE');

export function providePostSubscriptionsSubscriptionMigrate(): FactoryProvider {
  return {
    provide: POST_SUBSCRIPTIONS_SUBSCRIPTION_MIGRATE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        subscription: string,
        body:
          | PostSubscriptionsSubscriptionMigrateBody
          | Signal<PostSubscriptionsSubscriptionMigrateBody>,
      ) =>
        httpResource<PostSubscriptionsSubscriptionMigrateResponse>(() => ({
          url: `${base}/v1/subscriptions/${subscription}/migrate`,
          method: 'POST',
          body,
        }));
    },
  };
}
