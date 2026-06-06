import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostBillingCreditGrantsIdExpireBody = NonNullable<
  paths['/v1/billing/credit_grants/{id}/expire']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostBillingCreditGrantsIdExpireResponse =
  paths['/v1/billing/credit_grants/{id}/expire']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_CREDIT_GRANTS_ID_EXPIRE = new InjectionToken<
  (
    id: string,
    body:
      | PostBillingCreditGrantsIdExpireBody
      | Signal<PostBillingCreditGrantsIdExpireBody>,
  ) => ReturnType<typeof httpResource<PostBillingCreditGrantsIdExpireResponse>>
>('POST_BILLING_CREDIT_GRANTS_ID_EXPIRE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body:
        | PostBillingCreditGrantsIdExpireBody
        | Signal<PostBillingCreditGrantsIdExpireBody>,
    ) =>
      httpResource<PostBillingCreditGrantsIdExpireResponse>(() => ({
        url: `${base}/v1/billing/credit_grants/${id}/expire`,
        method: 'POST',
        body,
      }));
  },
});
