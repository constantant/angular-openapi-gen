import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPayoutsPayoutBody = NonNullable<
  paths['/v1/payouts/{payout}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPayoutsPayoutResponse =
  paths['/v1/payouts/{payout}']['post']['responses']['200']['content']['application/json'];

export const POST_PAYOUTS_PAYOUT = new InjectionToken<
  (
    payout: string,
    body: PostPayoutsPayoutBody | Signal<PostPayoutsPayoutBody>,
  ) => ReturnType<typeof httpResource<PostPayoutsPayoutResponse>>
>('POST_PAYOUTS_PAYOUT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      payout: string,
      body: PostPayoutsPayoutBody | Signal<PostPayoutsPayoutBody>,
    ) =>
      httpResource<PostPayoutsPayoutResponse>(() => ({
        url: `${base}/v1/payouts/${payout}`,
        method: 'POST',
        body,
      }));
  },
});
