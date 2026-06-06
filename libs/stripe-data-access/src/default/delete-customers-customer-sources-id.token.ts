import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteCustomersCustomerSourcesIdBody = NonNullable<
  paths['/v1/customers/{customer}/sources/{id}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteCustomersCustomerSourcesIdResponse =
  paths['/v1/customers/{customer}/sources/{id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_CUSTOMERS_CUSTOMER_SOURCES_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    body:
      | DeleteCustomersCustomerSourcesIdBody
      | Signal<DeleteCustomersCustomerSourcesIdBody>,
  ) => ReturnType<typeof httpResource<DeleteCustomersCustomerSourcesIdResponse>>
>('DELETE_CUSTOMERS_CUSTOMER_SOURCES_ID');

export function provideDeleteCustomersCustomerSourcesId(): FactoryProvider {
  return {
    provide: DELETE_CUSTOMERS_CUSTOMER_SOURCES_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        id: string,
        body:
          | DeleteCustomersCustomerSourcesIdBody
          | Signal<DeleteCustomersCustomerSourcesIdBody>,
      ) =>
        httpResource<DeleteCustomersCustomerSourcesIdResponse>(() => ({
          url: `${base}/v1/customers/${customer}/sources/${id}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
