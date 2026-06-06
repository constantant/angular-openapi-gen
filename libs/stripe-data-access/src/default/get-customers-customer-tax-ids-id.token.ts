import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersCustomerTaxIdsIdParams =
  paths['/v1/customers/{customer}/tax_ids/{id}']['get']['parameters']['query'];

export type GetCustomersCustomerTaxIdsIdResponse =
  paths['/v1/customers/{customer}/tax_ids/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_TAX_IDS_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    params?:
      | GetCustomersCustomerTaxIdsIdParams
      | (() => GetCustomersCustomerTaxIdsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetCustomersCustomerTaxIdsIdResponse>>
>('GET_CUSTOMERS_CUSTOMER_TAX_IDS_ID');

export function provideGetCustomersCustomerTaxIdsId(): FactoryProvider {
  return {
    provide: GET_CUSTOMERS_CUSTOMER_TAX_IDS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        id: string,
        params?:
          | GetCustomersCustomerTaxIdsIdParams
          | (() => GetCustomersCustomerTaxIdsIdParams | undefined),
      ) =>
        httpResource<GetCustomersCustomerTaxIdsIdResponse>(() => ({
          url: `${base}/v1/customers/${customer}/tax_ids/${id}`,
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
