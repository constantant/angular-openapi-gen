import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerTaxIdsIdParams =
  paths['/v1/customers/{customer}/tax_ids/{id}']['get']['parameters']['query'];

type GetCustomersCustomerTaxIdsIdResponse =
  paths['/v1/customers/{customer}/tax_ids/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_TAX_IDS_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    params?: GetCustomersCustomerTaxIdsIdParams,
  ) => ReturnType<typeof httpResource<GetCustomersCustomerTaxIdsIdResponse>>
>('GET_CUSTOMERS_CUSTOMER_TAX_IDS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      id: string,
      params?: GetCustomersCustomerTaxIdsIdParams,
    ) =>
      httpResource<GetCustomersCustomerTaxIdsIdResponse>(() => ({
        url: `${base}/v1/customers/${customer}/tax_ids/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
