import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPaymentMethodsParams =
  paths['/v1/payment_methods']['get']['parameters']['query'];

export type GetPaymentMethodsResponse =
  paths['/v1/payment_methods']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_METHODS = new InjectionToken<
  (
    params?:
      | GetPaymentMethodsParams
      | (() => GetPaymentMethodsParams | undefined),
  ) => ReturnType<typeof httpResource<GetPaymentMethodsResponse>>
>('GET_PAYMENT_METHODS');

export function provideGetPaymentMethods(): FactoryProvider {
  return {
    provide: GET_PAYMENT_METHODS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetPaymentMethodsParams
          | (() => GetPaymentMethodsParams | undefined),
      ) =>
        httpResource<GetPaymentMethodsResponse>(() => ({
          url: `${base}/v1/payment_methods`,
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
