import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerTaxIdsParams =
  paths['/v1/customers/{customer}/tax_ids']['get']['parameters']['query'];

type GetCustomersCustomerTaxIdsResponse =
  paths['/v1/customers/{customer}/tax_ids']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_TAX_IDS = new InjectionToken<
  (
    customer: string,
    params?: GetCustomersCustomerTaxIdsParams,
  ) => ReturnType<typeof httpResource<GetCustomersCustomerTaxIdsResponse>>
>('GET_CUSTOMERS_CUSTOMER_TAX_IDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (customer: string, params?: GetCustomersCustomerTaxIdsParams) =>
      httpResource<GetCustomersCustomerTaxIdsResponse>(() => ({
        url: `${base}/v1/customers/${customer}/tax_ids`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
