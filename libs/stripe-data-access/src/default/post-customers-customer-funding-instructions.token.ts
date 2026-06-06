import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCustomersCustomerFundingInstructionsBody = NonNullable<
  paths['/v1/customers/{customer}/funding_instructions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCustomersCustomerFundingInstructionsResponse =
  paths['/v1/customers/{customer}/funding_instructions']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS_CUSTOMER_FUNDING_INSTRUCTIONS = new InjectionToken<
  (
    customer: string,
    body:
      | PostCustomersCustomerFundingInstructionsBody
      | Signal<PostCustomersCustomerFundingInstructionsBody>,
  ) => ReturnType<
    typeof httpResource<PostCustomersCustomerFundingInstructionsResponse>
  >
>('POST_CUSTOMERS_CUSTOMER_FUNDING_INSTRUCTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      customer: string,
      body:
        | PostCustomersCustomerFundingInstructionsBody
        | Signal<PostCustomersCustomerFundingInstructionsBody>,
    ) =>
      httpResource<PostCustomersCustomerFundingInstructionsResponse>(() => ({
        url: `${base}/v1/customers/${customer}/funding_instructions`,
        method: 'POST',
        body,
      }));
  },
});
