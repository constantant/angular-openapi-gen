import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBillingMetersIdParams =
  paths['/v1/billing/meters/{id}']['get']['parameters']['query'];

type GetBillingMetersIdResponse =
  paths['/v1/billing/meters/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_METERS_ID = new InjectionToken<
  (
    id: string,
    params?: GetBillingMetersIdParams,
  ) => ReturnType<typeof httpResource<GetBillingMetersIdResponse>>
>('GET_BILLING_METERS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetBillingMetersIdParams) =>
      httpResource<GetBillingMetersIdResponse>(() => ({
        url: `${base}/v1/billing/meters/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
