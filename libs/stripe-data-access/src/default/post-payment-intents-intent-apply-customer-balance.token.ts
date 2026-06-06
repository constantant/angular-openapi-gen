import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPaymentIntentsIntentApplyCustomerBalanceBody = NonNullable<
  paths['/v1/payment_intents/{intent}/apply_customer_balance']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPaymentIntentsIntentApplyCustomerBalanceResponse =
  paths['/v1/payment_intents/{intent}/apply_customer_balance']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_INTENTS_INTENT_APPLY_CUSTOMER_BALANCE =
  new InjectionToken<
    (
      intent: string,
      body:
        | PostPaymentIntentsIntentApplyCustomerBalanceBody
        | Signal<PostPaymentIntentsIntentApplyCustomerBalanceBody>,
    ) => ReturnType<
      typeof httpResource<PostPaymentIntentsIntentApplyCustomerBalanceResponse>
    >
  >('POST_PAYMENT_INTENTS_INTENT_APPLY_CUSTOMER_BALANCE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        intent: string,
        body:
          | PostPaymentIntentsIntentApplyCustomerBalanceBody
          | Signal<PostPaymentIntentsIntentApplyCustomerBalanceBody>,
      ) =>
        httpResource<PostPaymentIntentsIntentApplyCustomerBalanceResponse>(
          () => ({
            url: `${base}/v1/payment_intents/${intent}/apply_customer_balance`,
            method: 'POST',
            body,
          }),
        );
    },
  });
