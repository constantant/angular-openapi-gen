import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCheckoutSessionsSessionBody = NonNullable<
  paths['/v1/checkout/sessions/{session}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCheckoutSessionsSessionResponse =
  paths['/v1/checkout/sessions/{session}']['post']['responses']['200']['content']['application/json'];

export const POST_CHECKOUT_SESSIONS_SESSION = new InjectionToken<
  (
    session: string,
    body:
      | PostCheckoutSessionsSessionBody
      | Signal<PostCheckoutSessionsSessionBody>,
  ) => ReturnType<typeof httpResource<PostCheckoutSessionsSessionResponse>>
>('POST_CHECKOUT_SESSIONS_SESSION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      session: string,
      body:
        | PostCheckoutSessionsSessionBody
        | Signal<PostCheckoutSessionsSessionBody>,
    ) =>
      httpResource<PostCheckoutSessionsSessionResponse>(() => ({
        url: `${base}/v1/checkout/sessions/${session}`,
        method: 'POST',
        body,
      }));
  },
});
