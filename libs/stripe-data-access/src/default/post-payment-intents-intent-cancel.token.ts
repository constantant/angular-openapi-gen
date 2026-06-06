import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentIntentsIntentCancelBody = NonNullable<
  paths['/v1/payment_intents/{intent}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentIntentsIntentCancelResponse =
  paths['/v1/payment_intents/{intent}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_INTENTS_INTENT_CANCEL = new InjectionToken<
  (
    intent: string,
    body:
      | PostPaymentIntentsIntentCancelBody
      | Signal<PostPaymentIntentsIntentCancelBody>,
  ) => ReturnType<typeof httpResource<PostPaymentIntentsIntentCancelResponse>>
>('POST_PAYMENT_INTENTS_INTENT_CANCEL', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      intent: string,
      body:
        | PostPaymentIntentsIntentCancelBody
        | Signal<PostPaymentIntentsIntentCancelBody>,
    ) =>
      httpResource<PostPaymentIntentsIntentCancelResponse>(() => ({
        url: `${base}/v1/payment_intents/${intent}/cancel`,
        method: 'POST',
        body,
      }));
  },
});
