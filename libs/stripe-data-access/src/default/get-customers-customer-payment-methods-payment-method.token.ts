import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersCustomerPaymentMethodsPaymentMethodParams =
  paths['/v1/customers/{customer}/payment_methods/{payment_method}']['get']['parameters']['query'];

export type GetCustomersCustomerPaymentMethodsPaymentMethodResponse =
  paths['/v1/customers/{customer}/payment_methods/{payment_method}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_PAYMENT_METHODS_PAYMENT_METHOD =
  new InjectionToken<
    (
      customer: string,
      paymentMethod: string,
      params?:
        | GetCustomersCustomerPaymentMethodsPaymentMethodParams
        | (() =>
            | GetCustomersCustomerPaymentMethodsPaymentMethodParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<GetCustomersCustomerPaymentMethodsPaymentMethodResponse>
    >
  >('GET_CUSTOMERS_CUSTOMER_PAYMENT_METHODS_PAYMENT_METHOD');

export function provideGetCustomersCustomerPaymentMethodsPaymentMethod(): FactoryProvider {
  return {
    provide: GET_CUSTOMERS_CUSTOMER_PAYMENT_METHODS_PAYMENT_METHOD,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        paymentMethod: string,
        params?:
          | GetCustomersCustomerPaymentMethodsPaymentMethodParams
          | (() =>
              | GetCustomersCustomerPaymentMethodsPaymentMethodParams
              | undefined),
      ) =>
        httpResource<GetCustomersCustomerPaymentMethodsPaymentMethodResponse>(
          () => ({
            url: `${base}/v1/customers/${customer}/payment_methods/${paymentMethod}`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
