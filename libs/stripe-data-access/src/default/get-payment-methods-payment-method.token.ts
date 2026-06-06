import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPaymentMethodsPaymentMethodParams =
  paths['/v1/payment_methods/{payment_method}']['get']['parameters']['query'];

export type GetPaymentMethodsPaymentMethodResponse =
  paths['/v1/payment_methods/{payment_method}']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_METHODS_PAYMENT_METHOD = new InjectionToken<
  (
    paymentMethod: string,
    params?:
      | GetPaymentMethodsPaymentMethodParams
      | (() => GetPaymentMethodsPaymentMethodParams | undefined),
  ) => ReturnType<typeof httpResource<GetPaymentMethodsPaymentMethodResponse>>
>('GET_PAYMENT_METHODS_PAYMENT_METHOD');

export function provideGetPaymentMethodsPaymentMethod(): FactoryProvider {
  return {
    provide: GET_PAYMENT_METHODS_PAYMENT_METHOD,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        paymentMethod: string,
        params?:
          | GetPaymentMethodsPaymentMethodParams
          | (() => GetPaymentMethodsPaymentMethodParams | undefined),
      ) =>
        httpResource<GetPaymentMethodsPaymentMethodResponse>(() => ({
          url: `${base}/v1/payment_methods/${paymentMethod}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
