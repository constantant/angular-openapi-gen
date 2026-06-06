import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBillingCreditGrantsIdParams =
  paths['/v1/billing/credit_grants/{id}']['get']['parameters']['query'];

type GetBillingCreditGrantsIdResponse =
  paths['/v1/billing/credit_grants/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_CREDIT_GRANTS_ID = new InjectionToken<
  (
    id: string,
    params?: GetBillingCreditGrantsIdParams,
  ) => ReturnType<typeof httpResource<GetBillingCreditGrantsIdResponse>>
>('GET_BILLING_CREDIT_GRANTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetBillingCreditGrantsIdParams) =>
      httpResource<GetBillingCreditGrantsIdResponse>(() => ({
        url: `${base}/v1/billing/credit_grants/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
