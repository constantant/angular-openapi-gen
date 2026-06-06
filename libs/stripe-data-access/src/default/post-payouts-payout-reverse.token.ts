import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPayoutsPayoutReverseBody = NonNullable<
  paths['/v1/payouts/{payout}/reverse']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPayoutsPayoutReverseResponse =
  paths['/v1/payouts/{payout}/reverse']['post']['responses']['200']['content']['application/json'];

export const POST_PAYOUTS_PAYOUT_REVERSE = new InjectionToken<
  (
    payout: string,
    body: PostPayoutsPayoutReverseBody | Signal<PostPayoutsPayoutReverseBody>,
  ) => ReturnType<typeof httpResource<PostPayoutsPayoutReverseResponse>>
>('POST_PAYOUTS_PAYOUT_REVERSE');

export function providePostPayoutsPayoutReverse(): FactoryProvider {
  return {
    provide: POST_PAYOUTS_PAYOUT_REVERSE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        payout: string,
        body:
          | PostPayoutsPayoutReverseBody
          | Signal<PostPayoutsPayoutReverseBody>,
      ) =>
        httpResource<PostPayoutsPayoutReverseResponse>(() => ({
          url: `${base}/v1/payouts/${payout}/reverse`,
          method: 'POST',
          body,
        }));
    },
  };
}
