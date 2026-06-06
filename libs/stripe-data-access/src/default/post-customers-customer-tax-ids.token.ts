import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerTaxIdsBody = NonNullable<
  paths['/v1/customers/{customer}/tax_ids']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerTaxIdsResponse =
  paths['/v1/customers/{customer}/tax_ids']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_TAX_IDS = new InjectionToken<
  (
    customer: string,
    body:
      | PostCustomersCustomerTaxIdsBody
      | Signal<PostCustomersCustomerTaxIdsBody>,
  ) => ReturnType<typeof httpResource<PostCustomersCustomerTaxIdsResponse>>
>('POST_CUSTOMERS_CUSTOMER_TAX_IDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      body:
        | PostCustomersCustomerTaxIdsBody
        | Signal<PostCustomersCustomerTaxIdsBody>,
    ) =>
      httpResource<PostCustomersCustomerTaxIdsResponse>(() => ({
        url: `${base}/v1/customers/${customer}/tax_ids`,
        method: 'POST',
        body,
      }));
  },
});
