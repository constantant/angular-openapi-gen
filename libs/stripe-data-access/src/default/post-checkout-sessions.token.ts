import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCheckoutSessionsBody = NonNullable<
  paths['/v1/checkout/sessions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCheckoutSessionsResponse =
  paths['/v1/checkout/sessions']['post']['responses']['200']['content']['application/json'];

export const POST_CHECKOUT_SESSIONS = new InjectionToken<
  (
    body: PostCheckoutSessionsBody | Signal<PostCheckoutSessionsBody>,
  ) => ReturnType<typeof httpResource<PostCheckoutSessionsResponse>>
>('POST_CHECKOUT_SESSIONS');

export function providePostCheckoutSessions(): FactoryProvider {
  return {
    provide: POST_CHECKOUT_SESSIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body: PostCheckoutSessionsBody | Signal<PostCheckoutSessionsBody>,
      ) =>
        httpResource<PostCheckoutSessionsResponse>(() => ({
          url: `${base}/v1/checkout/sessions`,
          method: 'POST',
          body,
        }));
    },
  };
}
