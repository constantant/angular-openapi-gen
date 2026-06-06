import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostBillingCreditGrantsIdBody = NonNullable<
  paths['/v1/billing/credit_grants/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostBillingCreditGrantsIdResponse =
  paths['/v1/billing/credit_grants/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_CREDIT_GRANTS_ID = new InjectionToken<
  (
    id: string,
    body: PostBillingCreditGrantsIdBody | Signal<PostBillingCreditGrantsIdBody>,
  ) => ReturnType<typeof httpResource<PostBillingCreditGrantsIdResponse>>
>('POST_BILLING_CREDIT_GRANTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body:
        | PostBillingCreditGrantsIdBody
        | Signal<PostBillingCreditGrantsIdBody>,
    ) =>
      httpResource<PostBillingCreditGrantsIdResponse>(() => ({
        url: `${base}/v1/billing/credit_grants/${id}`,
        method: 'POST',
        body,
      }));
  },
});
