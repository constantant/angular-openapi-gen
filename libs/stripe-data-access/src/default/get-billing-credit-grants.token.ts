import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBillingCreditGrantsParams =
  paths['/v1/billing/credit_grants']['get']['parameters']['query'];

export type GetBillingCreditGrantsResponse =
  paths['/v1/billing/credit_grants']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_CREDIT_GRANTS = new InjectionToken<
  (
    params?:
      | GetBillingCreditGrantsParams
      | (() => GetBillingCreditGrantsParams | undefined),
  ) => ReturnType<typeof httpResource<GetBillingCreditGrantsResponse>>
>('GET_BILLING_CREDIT_GRANTS');

export function provideGetBillingCreditGrants(): FactoryProvider {
  return {
    provide: GET_BILLING_CREDIT_GRANTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetBillingCreditGrantsParams
          | (() => GetBillingCreditGrantsParams | undefined),
      ) =>
        httpResource<GetBillingCreditGrantsResponse>(() => ({
          url: `${base}/v1/billing/credit_grants`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
