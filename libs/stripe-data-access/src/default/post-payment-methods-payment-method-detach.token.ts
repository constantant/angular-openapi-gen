import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPaymentMethodsPaymentMethodDetachBody = NonNullable<
  paths['/v1/payment_methods/{payment_method}/detach']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPaymentMethodsPaymentMethodDetachResponse =
  paths['/v1/payment_methods/{payment_method}/detach']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_METHODS_PAYMENT_METHOD_DETACH = new InjectionToken<
  (
    payment_method: string,
    body:
      | PostPaymentMethodsPaymentMethodDetachBody
      | Signal<PostPaymentMethodsPaymentMethodDetachBody>,
  ) => ReturnType<
    typeof httpResource<PostPaymentMethodsPaymentMethodDetachResponse>
  >
>('POST_PAYMENT_METHODS_PAYMENT_METHOD_DETACH', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      payment_method: string,
      body:
        | PostPaymentMethodsPaymentMethodDetachBody
        | Signal<PostPaymentMethodsPaymentMethodDetachBody>,
    ) =>
      httpResource<PostPaymentMethodsPaymentMethodDetachResponse>(() => ({
        url: `${base}/v1/payment_methods/${payment_method}/detach`,
        method: 'POST',
        body,
      }));
  },
});
