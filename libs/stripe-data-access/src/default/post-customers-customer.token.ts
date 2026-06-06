import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerBody = NonNullable<
  paths['/v1/customers/{customer}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerResponse =
  paths['/v1/customers/{customer}']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER = new InjectionToken<
  (
    customer: string,
    body: PostCustomersCustomerBody | Signal<PostCustomersCustomerBody>,
  ) => ReturnType<typeof httpResource<PostCustomersCustomerResponse>>
>('POST_CUSTOMERS_CUSTOMER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      body: PostCustomersCustomerBody | Signal<PostCustomersCustomerBody>,
    ) =>
      httpResource<PostCustomersCustomerResponse>(() => ({
        url: `${base}/v1/customers/${customer}`,
        method: 'POST',
        body,
      }));
  },
});
