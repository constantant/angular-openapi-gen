import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCustomersCustomerCardsIdBody = NonNullable<
  paths['/v1/customers/{customer}/cards/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCustomersCustomerCardsIdResponse =
  paths['/v1/customers/{customer}/cards/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_CARDS_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    body:
      | PostCustomersCustomerCardsIdBody
      | Signal<PostCustomersCustomerCardsIdBody>,
  ) => ReturnType<typeof httpResource<PostCustomersCustomerCardsIdResponse>>
>('POST_CUSTOMERS_CUSTOMER_CARDS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      id: string,
      body:
        | PostCustomersCustomerCardsIdBody
        | Signal<PostCustomersCustomerCardsIdBody>,
    ) =>
      httpResource<PostCustomersCustomerCardsIdResponse>(() => ({
        url: `${base}/v1/customers/${customer}/cards/${id}`,
        method: 'POST',
        body,
      }));
  },
});
