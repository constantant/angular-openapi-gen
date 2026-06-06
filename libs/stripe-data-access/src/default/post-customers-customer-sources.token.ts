import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerSourcesBody = NonNullable<
  paths['/v1/customers/{customer}/sources']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerSourcesResponse =
  paths['/v1/customers/{customer}/sources']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_SOURCES = new InjectionToken<
  (
    customer: string,
    body:
      | PostCustomersCustomerSourcesBody
      | Signal<PostCustomersCustomerSourcesBody>,
  ) => ReturnType<typeof httpResource<PostCustomersCustomerSourcesResponse>>
>('POST_CUSTOMERS_CUSTOMER_SOURCES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      body:
        | PostCustomersCustomerSourcesBody
        | Signal<PostCustomersCustomerSourcesBody>,
    ) =>
      httpResource<PostCustomersCustomerSourcesResponse>(() => ({
        url: `${base}/v1/customers/${customer}/sources`,
        method: 'POST',
        body,
      }));
  },
});
