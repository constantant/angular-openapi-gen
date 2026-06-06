import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteCustomersCustomerDiscountBody = NonNullable<
  paths['/v1/customers/{customer}/discount']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteCustomersCustomerDiscountResponse =
  paths['/v1/customers/{customer}/discount']['delete']['responses']['200']['content']['application/json'];

export const DELETE_CUSTOMERS_CUSTOMER_DISCOUNT = new InjectionToken<
  (
    customer: string,
    body:
      | DeleteCustomersCustomerDiscountBody
      | Signal<DeleteCustomersCustomerDiscountBody>,
  ) => ReturnType<typeof httpResource<DeleteCustomersCustomerDiscountResponse>>
>('DELETE_CUSTOMERS_CUSTOMER_DISCOUNT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      body:
        | DeleteCustomersCustomerDiscountBody
        | Signal<DeleteCustomersCustomerDiscountBody>,
    ) =>
      httpResource<DeleteCustomersCustomerDiscountResponse>(() => ({
        url: `${base}/v1/customers/${customer}/discount`,
        method: 'DELETE',
        body,
      }));
  },
});
