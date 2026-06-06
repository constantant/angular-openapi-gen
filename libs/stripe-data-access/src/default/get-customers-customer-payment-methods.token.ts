import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersCustomerPaymentMethodsParams =
  paths['/v1/customers/{customer}/payment_methods']['get']['parameters']['query'];

export type GetCustomersCustomerPaymentMethodsResponse =
  paths['/v1/customers/{customer}/payment_methods']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_PAYMENT_METHODS = new InjectionToken<
  (
    customer: string,
    params?:
      | GetCustomersCustomerPaymentMethodsParams
      | (() => GetCustomersCustomerPaymentMethodsParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetCustomersCustomerPaymentMethodsResponse>
  >
>('GET_CUSTOMERS_CUSTOMER_PAYMENT_METHODS');

export function provideGetCustomersCustomerPaymentMethods(): FactoryProvider {
  return {
    provide: GET_CUSTOMERS_CUSTOMER_PAYMENT_METHODS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        params?:
          | GetCustomersCustomerPaymentMethodsParams
          | (() => GetCustomersCustomerPaymentMethodsParams | undefined),
      ) =>
        httpResource<GetCustomersCustomerPaymentMethodsResponse>(() => ({
          url: `${base}/v1/customers/${customer}/payment_methods`,
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
