import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCustomersCustomerSourcesIdBody = NonNullable<
  paths['/v1/customers/{customer}/sources/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCustomersCustomerSourcesIdResponse =
  paths['/v1/customers/{customer}/sources/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_SOURCES_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    body:
      | PostCustomersCustomerSourcesIdBody
      | Signal<PostCustomersCustomerSourcesIdBody>,
  ) => ReturnType<typeof httpResource<PostCustomersCustomerSourcesIdResponse>>
>('POST_CUSTOMERS_CUSTOMER_SOURCES_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      id: string,
      body:
        | PostCustomersCustomerSourcesIdBody
        | Signal<PostCustomersCustomerSourcesIdBody>,
    ) =>
      httpResource<PostCustomersCustomerSourcesIdResponse>(() => ({
        url: `${base}/v1/customers/${customer}/sources/${id}`,
        method: 'POST',
        body,
      }));
  },
});
