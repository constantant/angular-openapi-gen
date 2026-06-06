import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentMethodsBody = NonNullable<
  paths['/v1/payment_methods']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentMethodsResponse =
  paths['/v1/payment_methods']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_METHODS = new InjectionToken<
  (
    body: PostPaymentMethodsBody | Signal<PostPaymentMethodsBody>,
  ) => ReturnType<typeof httpResource<PostPaymentMethodsResponse>>
>('POST_PAYMENT_METHODS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostPaymentMethodsBody | Signal<PostPaymentMethodsBody>) =>
      httpResource<PostPaymentMethodsResponse>(() => ({
        url: `${base}/v1/payment_methods`,
        method: 'POST',
        body,
      }));
  },
});
