import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPaymentIntentsIntentVerifyMicrodepositsBody = NonNullable<
  paths['/v1/payment_intents/{intent}/verify_microdeposits']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPaymentIntentsIntentVerifyMicrodepositsResponse =
  paths['/v1/payment_intents/{intent}/verify_microdeposits']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_INTENTS_INTENT_VERIFY_MICRODEPOSITS =
  new InjectionToken<
    (
      intent: string,
      body:
        | PostPaymentIntentsIntentVerifyMicrodepositsBody
        | Signal<PostPaymentIntentsIntentVerifyMicrodepositsBody>,
    ) => ReturnType<
      typeof httpResource<PostPaymentIntentsIntentVerifyMicrodepositsResponse>
    >
  >('POST_PAYMENT_INTENTS_INTENT_VERIFY_MICRODEPOSITS', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        intent: string,
        body:
          | PostPaymentIntentsIntentVerifyMicrodepositsBody
          | Signal<PostPaymentIntentsIntentVerifyMicrodepositsBody>,
      ) =>
        httpResource<PostPaymentIntentsIntentVerifyMicrodepositsResponse>(
          () => ({
            url: `${base}/v1/payment_intents/${intent}/verify_microdeposits`,
            method: 'POST',
            body,
          }),
        );
    },
  });
