import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteCustomersCustomerBody = NonNullable<
  paths['/v1/customers/{customer}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteCustomersCustomerResponse =
  paths['/v1/customers/{customer}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_CUSTOMERS_CUSTOMER = new InjectionToken<
  (
    customer: string,
    body: DeleteCustomersCustomerBody | Signal<DeleteCustomersCustomerBody>,
  ) => ReturnType<typeof httpResource<DeleteCustomersCustomerResponse>>
>('DELETE_CUSTOMERS_CUSTOMER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      body: DeleteCustomersCustomerBody | Signal<DeleteCustomersCustomerBody>,
    ) =>
      httpResource<DeleteCustomersCustomerResponse>(() => ({
        url: `${base}/v1/customers/${customer}`,
        method: 'DELETE',
        body,
      }));
  },
});
