import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomersCustomerSourcesIdVerifyBody = NonNullable<
  paths['/v1/customers/{customer}/sources/{id}/verify']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCustomersCustomerSourcesIdVerifyResponse =
  paths['/v1/customers/{customer}/sources/{id}/verify']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_SOURCES_ID_VERIFY = new InjectionToken<
  (
    customer: string,
    id: string,
    body:
      | PostCustomersCustomerSourcesIdVerifyBody
      | Signal<PostCustomersCustomerSourcesIdVerifyBody>,
  ) => ReturnType<
    typeof httpResource<PostCustomersCustomerSourcesIdVerifyResponse>
  >
>('POST_CUSTOMERS_CUSTOMER_SOURCES_ID_VERIFY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      id: string,
      body:
        | PostCustomersCustomerSourcesIdVerifyBody
        | Signal<PostCustomersCustomerSourcesIdVerifyBody>,
    ) =>
      httpResource<PostCustomersCustomerSourcesIdVerifyResponse>(() => ({
        url: `${base}/v1/customers/${customer}/sources/${id}/verify`,
        method: 'POST',
        body,
      }));
  },
});
