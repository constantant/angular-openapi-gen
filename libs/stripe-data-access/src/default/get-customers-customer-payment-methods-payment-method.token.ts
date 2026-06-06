import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerPaymentMethodsPaymentMethodParams =
  paths['/v1/customers/{customer}/payment_methods/{payment_method}']['get']['parameters']['query'];

type GetCustomersCustomerPaymentMethodsPaymentMethodResponse =
  paths['/v1/customers/{customer}/payment_methods/{payment_method}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_PAYMENT_METHODS_PAYMENT_METHOD =
  new InjectionToken<
    (
      customer: string,
      payment_method: string,
      params?: GetCustomersCustomerPaymentMethodsPaymentMethodParams,
    ) => ReturnType<
      typeof httpResource<GetCustomersCustomerPaymentMethodsPaymentMethodResponse>
    >
  >('GET_CUSTOMERS_CUSTOMER_PAYMENT_METHODS_PAYMENT_METHOD', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        payment_method: string,
        params?: GetCustomersCustomerPaymentMethodsPaymentMethodParams,
      ) =>
        httpResource<GetCustomersCustomerPaymentMethodsPaymentMethodResponse>(
          () => ({
            url: `${base}/v1/customers/${customer}/payment_methods/${payment_method}`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
