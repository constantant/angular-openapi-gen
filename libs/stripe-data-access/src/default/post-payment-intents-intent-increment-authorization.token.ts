import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentIntentsIntentIncrementAuthorizationBody = NonNullable<
  paths['/v1/payment_intents/{intent}/increment_authorization']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentIntentsIntentIncrementAuthorizationResponse =
  paths['/v1/payment_intents/{intent}/increment_authorization']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_INTENTS_INTENT_INCREMENT_AUTHORIZATION =
  new InjectionToken<
    (
      intent: string,
      body:
        | PostPaymentIntentsIntentIncrementAuthorizationBody
        | Signal<PostPaymentIntentsIntentIncrementAuthorizationBody>,
    ) => ReturnType<
      typeof httpResource<PostPaymentIntentsIntentIncrementAuthorizationResponse>
    >
  >('POST_PAYMENT_INTENTS_INTENT_INCREMENT_AUTHORIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        intent: string,
        body:
          | PostPaymentIntentsIntentIncrementAuthorizationBody
          | Signal<PostPaymentIntentsIntentIncrementAuthorizationBody>,
      ) =>
        httpResource<PostPaymentIntentsIntentIncrementAuthorizationResponse>(
          () => ({
            url: `${base}/v1/payment_intents/${intent}/increment_authorization`,
            method: 'POST',
            body,
          }),
        );
    },
  });
