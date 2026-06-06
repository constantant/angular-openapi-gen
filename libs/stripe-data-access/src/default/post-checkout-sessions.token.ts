import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCheckoutSessionsBody = NonNullable<
  paths['/v1/checkout/sessions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCheckoutSessionsResponse =
  paths['/v1/checkout/sessions']['post']['responses']['200']['content']['application/json'];

export const POST_CHECKOUT_SESSIONS = new InjectionToken<
  (
    body: PostCheckoutSessionsBody | Signal<PostCheckoutSessionsBody>,
  ) => ReturnType<typeof httpResource<PostCheckoutSessionsResponse>>
>('POST_CHECKOUT_SESSIONS', {
  providedIn: 'root',
  factory: () => {
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
});
