import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentMethodsPaymentMethodBody = NonNullable<
  paths['/v1/payment_methods/{payment_method}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentMethodsPaymentMethodResponse =
  paths['/v1/payment_methods/{payment_method}']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_METHODS_PAYMENT_METHOD = new InjectionToken<
  (
    paymentMethod: string,
    body:
      | PostPaymentMethodsPaymentMethodBody
      | Signal<PostPaymentMethodsPaymentMethodBody>,
  ) => ReturnType<typeof httpResource<PostPaymentMethodsPaymentMethodResponse>>
>('POST_PAYMENT_METHODS_PAYMENT_METHOD', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      paymentMethod: string,
      body:
        | PostPaymentMethodsPaymentMethodBody
        | Signal<PostPaymentMethodsPaymentMethodBody>,
    ) =>
      httpResource<PostPaymentMethodsPaymentMethodResponse>(() => ({
        url: `${base}/v1/payment_methods/${paymentMethod}`,
        method: 'POST',
        body,
      }));
  },
});
