import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerSourcesIdBody = NonNullable<
  paths['/v1/customers/{customer}/sources/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerSourcesIdResponse =
  paths['/v1/customers/{customer}/sources/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_SOURCES_ID = new InjectionToken<
  (
    customer: string,
    id: string,
    body:
      | PostCustomersCustomerSourcesIdBody
      | Signal<PostCustomersCustomerSourcesIdBody>,
  ) => ReturnType<typeof httpResource<PostCustomersCustomerSourcesIdResponse>>
>('POST_CUSTOMERS_CUSTOMER_SOURCES_ID');

export function providePostCustomersCustomerSourcesId(): FactoryProvider {
  return {
    provide: POST_CUSTOMERS_CUSTOMER_SOURCES_ID,
    useFactory: () => {
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
  };
}
