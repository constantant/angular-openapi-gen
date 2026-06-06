import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerCardsBody = NonNullable<
  paths['/v1/customers/{customer}/cards']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerCardsResponse =
  paths['/v1/customers/{customer}/cards']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_CARDS = new InjectionToken<
  (
    customer: string,
    body:
      | PostCustomersCustomerCardsBody
      | Signal<PostCustomersCustomerCardsBody>,
  ) => ReturnType<typeof httpResource<PostCustomersCustomerCardsResponse>>
>('POST_CUSTOMERS_CUSTOMER_CARDS');

export function providePostCustomersCustomerCards(): FactoryProvider {
  return {
    provide: POST_CUSTOMERS_CUSTOMER_CARDS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        customer: string,
        body:
          | PostCustomersCustomerCardsBody
          | Signal<PostCustomersCustomerCardsBody>,
      ) =>
        httpResource<PostCustomersCustomerCardsResponse>(() => ({
          url: `${base}/v1/customers/${customer}/cards`,
          method: 'POST',
          body,
        }));
    },
  };
}
