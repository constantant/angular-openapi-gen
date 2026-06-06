import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPaymentMethodConfigurationsBody = NonNullable<
  paths['/v1/payment_method_configurations']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPaymentMethodConfigurationsResponse =
  paths['/v1/payment_method_configurations']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_METHOD_CONFIGURATIONS = new InjectionToken<
  (
    body:
      | PostPaymentMethodConfigurationsBody
      | Signal<PostPaymentMethodConfigurationsBody>,
  ) => ReturnType<typeof httpResource<PostPaymentMethodConfigurationsResponse>>
>('POST_PAYMENT_METHOD_CONFIGURATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostPaymentMethodConfigurationsBody
        | Signal<PostPaymentMethodConfigurationsBody>,
    ) =>
      httpResource<PostPaymentMethodConfigurationsResponse>(() => ({
        url: `${base}/v1/payment_method_configurations`,
        method: 'POST',
        body,
      }));
  },
});
