import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBillingCreditGrantsBody = NonNullable<
  paths['/v1/billing/credit_grants']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBillingCreditGrantsResponse =
  paths['/v1/billing/credit_grants']['post']['responses']['200']['content']['application/json'];

export const POST_BILLING_CREDIT_GRANTS = new InjectionToken<
  (
    body: PostBillingCreditGrantsBody | Signal<PostBillingCreditGrantsBody>,
  ) => ReturnType<typeof httpResource<PostBillingCreditGrantsResponse>>
>('POST_BILLING_CREDIT_GRANTS');

export function providePostBillingCreditGrants(): FactoryProvider {
  return {
    provide: POST_BILLING_CREDIT_GRANTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body: PostBillingCreditGrantsBody | Signal<PostBillingCreditGrantsBody>,
      ) =>
        httpResource<PostBillingCreditGrantsResponse>(() => ({
          url: `${base}/v1/billing/credit_grants`,
          method: 'POST',
          body,
        }));
    },
  };
}
