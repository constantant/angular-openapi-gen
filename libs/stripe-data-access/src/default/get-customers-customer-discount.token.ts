import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersCustomerDiscountParams =
  paths['/v1/customers/{customer}/discount']['get']['parameters']['query'];

export type GetCustomersCustomerDiscountResponse =
  paths['/v1/customers/{customer}/discount']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_DISCOUNT = new InjectionToken<
  (
    customer: string,
    params?:
      | GetCustomersCustomerDiscountParams
      | (() => GetCustomersCustomerDiscountParams | undefined),
  ) => ReturnType<typeof httpResource<GetCustomersCustomerDiscountResponse>>
>('GET_CUSTOMERS_CUSTOMER_DISCOUNT');

export function provideGetCustomersCustomerDiscount(): FactoryProvider {
  return {
    provide: GET_CUSTOMERS_CUSTOMER_DISCOUNT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        params?:
          | GetCustomersCustomerDiscountParams
          | (() => GetCustomersCustomerDiscountParams | undefined),
      ) =>
        httpResource<GetCustomersCustomerDiscountResponse>(() => ({
          url: `${base}/v1/customers/${customer}/discount`,
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
