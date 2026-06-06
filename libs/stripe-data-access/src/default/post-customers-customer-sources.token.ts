import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
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
>('POST_CUSTOMERS_CUSTOMER_SOURCES');

export function providePostCustomersCustomerSources(): FactoryProvider {
  return {
    provide: POST_CUSTOMERS_CUSTOMER_SOURCES,
    useFactory: () => {
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
  };
}
