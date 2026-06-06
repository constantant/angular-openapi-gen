import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentMethodsPaymentMethodAttachBody = NonNullable<
  paths['/v1/payment_methods/{payment_method}/attach']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentMethodsPaymentMethodAttachResponse =
  paths['/v1/payment_methods/{payment_method}/attach']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_METHODS_PAYMENT_METHOD_ATTACH = new InjectionToken<
  (
    paymentMethod: string,
    body:
      | PostPaymentMethodsPaymentMethodAttachBody
      | Signal<PostPaymentMethodsPaymentMethodAttachBody>,
  ) => ReturnType<
    typeof httpResource<PostPaymentMethodsPaymentMethodAttachResponse>
  >
>('POST_PAYMENT_METHODS_PAYMENT_METHOD_ATTACH', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      paymentMethod: string,
      body:
        | PostPaymentMethodsPaymentMethodAttachBody
        | Signal<PostPaymentMethodsPaymentMethodAttachBody>,
    ) =>
      httpResource<PostPaymentMethodsPaymentMethodAttachResponse>(() => ({
        url: `${base}/v1/payment_methods/${paymentMethod}/attach`,
        method: 'POST',
        body,
      }));
  },
});
