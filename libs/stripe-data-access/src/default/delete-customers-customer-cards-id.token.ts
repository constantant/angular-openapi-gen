import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteCustomersCustomerCardsIdBody = NonNullable<
  paths['/v1/customers/{customer}/cards/{id}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteCustomersCustomerCardsIdResponse =
  paths['/v1/customers/{customer}/cards/{id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_CUSTOMERS_CUSTOMER_CARDS_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    body:
      | DeleteCustomersCustomerCardsIdBody
      | Signal<DeleteCustomersCustomerCardsIdBody>,
  ) => ReturnType<typeof httpResource<DeleteCustomersCustomerCardsIdResponse>>
>('DELETE_CUSTOMERS_CUSTOMER_CARDS_ID');

export function provideDeleteCustomersCustomerCardsId(): FactoryProvider {
  return {
    provide: DELETE_CUSTOMERS_CUSTOMER_CARDS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        id: string,
        body:
          | DeleteCustomersCustomerCardsIdBody
          | Signal<DeleteCustomersCustomerCardsIdBody>,
      ) =>
        httpResource<DeleteCustomersCustomerCardsIdResponse>(() => ({
          url: `${base}/v1/customers/${customer}/cards/${id}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
