import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPaymentMethodsPaymentMethodParams =
  paths['/v1/payment_methods/{payment_method}']['get']['parameters']['query'];

type GetPaymentMethodsPaymentMethodResponse =
  paths['/v1/payment_methods/{payment_method}']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_METHODS_PAYMENT_METHOD = new InjectionToken<
  (
    payment_method: string,
    params?: GetPaymentMethodsPaymentMethodParams,
  ) => ReturnType<typeof httpResource<GetPaymentMethodsPaymentMethodResponse>>
>('GET_PAYMENT_METHODS_PAYMENT_METHOD', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      payment_method: string,
      params?: GetPaymentMethodsPaymentMethodParams,
    ) =>
      httpResource<GetPaymentMethodsPaymentMethodResponse>(() => ({
        url: `${base}/v1/payment_methods/${payment_method}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
