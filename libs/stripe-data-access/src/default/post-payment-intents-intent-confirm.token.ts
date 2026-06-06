import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPaymentIntentsIntentConfirmBody = NonNullable<
  paths['/v1/payment_intents/{intent}/confirm']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPaymentIntentsIntentConfirmResponse =
  paths['/v1/payment_intents/{intent}/confirm']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_INTENTS_INTENT_CONFIRM = new InjectionToken<
  (
    intent: string,
    body:
      | PostPaymentIntentsIntentConfirmBody
      | Signal<PostPaymentIntentsIntentConfirmBody>,
  ) => ReturnType<typeof httpResource<PostPaymentIntentsIntentConfirmResponse>>
>('POST_PAYMENT_INTENTS_INTENT_CONFIRM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      intent: string,
      body:
        | PostPaymentIntentsIntentConfirmBody
        | Signal<PostPaymentIntentsIntentConfirmBody>,
    ) =>
      httpResource<PostPaymentIntentsIntentConfirmResponse>(() => ({
        url: `${base}/v1/payment_intents/${intent}/confirm`,
        method: 'POST',
        body,
      }));
  },
});
