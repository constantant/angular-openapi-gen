import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPaymentIntentsIntentBody = NonNullable<
  paths['/v1/payment_intents/{intent}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPaymentIntentsIntentResponse =
  paths['/v1/payment_intents/{intent}']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_INTENTS_INTENT = new InjectionToken<
  (
    intent: string,
    body: PostPaymentIntentsIntentBody | Signal<PostPaymentIntentsIntentBody>,
  ) => ReturnType<typeof httpResource<PostPaymentIntentsIntentResponse>>
>('POST_PAYMENT_INTENTS_INTENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      intent: string,
      body: PostPaymentIntentsIntentBody | Signal<PostPaymentIntentsIntentBody>,
    ) =>
      httpResource<PostPaymentIntentsIntentResponse>(() => ({
        url: `${base}/v1/payment_intents/${intent}`,
        method: 'POST',
        body,
      }));
  },
});
