import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingCreditGrantsIdVoidBody = NonNullable<
  paths['/v1/billing/credit_grants/{id}/void']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingCreditGrantsIdVoidResponse =
  paths['/v1/billing/credit_grants/{id}/void']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_CREDIT_GRANTS_ID_VOID = new InjectionToken<
  (
    id: string,
    body:
      | PostBillingCreditGrantsIdVoidBody
      | Signal<PostBillingCreditGrantsIdVoidBody>,
  ) => ReturnType<typeof httpResource<PostBillingCreditGrantsIdVoidResponse>>
>('POST_BILLING_CREDIT_GRANTS_ID_VOID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body:
        | PostBillingCreditGrantsIdVoidBody
        | Signal<PostBillingCreditGrantsIdVoidBody>,
    ) =>
      httpResource<PostBillingCreditGrantsIdVoidResponse>(() => ({
        url: `${base}/v1/billing/credit_grants/${id}/void`,
        method: 'POST',
        body,
      }));
  },
});
