import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCheckoutSessionsSessionExpireBody = NonNullable<
  paths['/v1/checkout/sessions/{session}/expire']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCheckoutSessionsSessionExpireResponse =
  paths['/v1/checkout/sessions/{session}/expire']['post']['responses']['200']['content']['application/json'];

export const POST_CHECKOUT_SESSIONS_SESSION_EXPIRE = new InjectionToken<
  (
    session: string,
    body:
      | PostCheckoutSessionsSessionExpireBody
      | Signal<PostCheckoutSessionsSessionExpireBody>,
  ) => ReturnType<
    typeof httpResource<PostCheckoutSessionsSessionExpireResponse>
  >
>('POST_CHECKOUT_SESSIONS_SESSION_EXPIRE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      session: string,
      body:
        | PostCheckoutSessionsSessionExpireBody
        | Signal<PostCheckoutSessionsSessionExpireBody>,
    ) =>
      httpResource<PostCheckoutSessionsSessionExpireResponse>(() => ({
        url: `${base}/v1/checkout/sessions/${session}/expire`,
        method: 'POST',
        body,
      }));
  },
});
