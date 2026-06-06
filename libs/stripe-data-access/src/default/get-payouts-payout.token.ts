import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPayoutsPayoutParams =
  paths['/v1/payouts/{payout}']['get']['parameters']['query'];

type GetPayoutsPayoutResponse =
  paths['/v1/payouts/{payout}']['get']['responses']['200']['content']['application/json'];

export const GET_PAYOUTS_PAYOUT = new InjectionToken<
  (
    payout: string,
    params?: GetPayoutsPayoutParams,
  ) => ReturnType<typeof httpResource<GetPayoutsPayoutResponse>>
>('GET_PAYOUTS_PAYOUT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (payout: string, params?: GetPayoutsPayoutParams) =>
      httpResource<GetPayoutsPayoutResponse>(() => ({
        url: `${base}/v1/payouts/${payout}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
