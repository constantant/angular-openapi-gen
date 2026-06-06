import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBillingMetersParams =
  paths['/v1/billing/meters']['get']['parameters']['query'];

type GetBillingMetersResponse =
  paths['/v1/billing/meters']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_METERS = new InjectionToken<
  (
    params?: GetBillingMetersParams,
  ) => ReturnType<typeof httpResource<GetBillingMetersResponse>>
>('GET_BILLING_METERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetBillingMetersParams) =>
      httpResource<GetBillingMetersResponse>(() => ({
        url: `${base}/v1/billing/meters`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
