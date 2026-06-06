import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteCustomersCustomerTaxIdsIdBody = NonNullable<
  paths['/v1/customers/{customer}/tax_ids/{id}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteCustomersCustomerTaxIdsIdResponse =
  paths['/v1/customers/{customer}/tax_ids/{id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_CUSTOMERS_CUSTOMER_TAX_IDS_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    body:
      | DeleteCustomersCustomerTaxIdsIdBody
      | Signal<DeleteCustomersCustomerTaxIdsIdBody>,
  ) => ReturnType<typeof httpResource<DeleteCustomersCustomerTaxIdsIdResponse>>
>('DELETE_CUSTOMERS_CUSTOMER_TAX_IDS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      id: string,
      body:
        | DeleteCustomersCustomerTaxIdsIdBody
        | Signal<DeleteCustomersCustomerTaxIdsIdBody>,
    ) =>
      httpResource<DeleteCustomersCustomerTaxIdsIdResponse>(() => ({
        url: `${base}/v1/customers/${customer}/tax_ids/${id}`,
        method: 'DELETE',
        body,
      }));
  },
});
