import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPayoutsParams = paths['/v1/payouts']['get']['parameters']['query'];

type GetPayoutsResponse =
  paths['/v1/payouts']['get']['responses']['200']['content']['application/json'];

export const GET_PAYOUTS = new InjectionToken<
  (
    params?: GetPayoutsParams,
  ) => ReturnType<typeof httpResource<GetPayoutsResponse>>
>('GET_PAYOUTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetPayoutsParams) =>
      httpResource<GetPayoutsResponse>(() => ({
        url: `${base}/v1/payouts`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
