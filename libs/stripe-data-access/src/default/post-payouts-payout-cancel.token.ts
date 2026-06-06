import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPayoutsPayoutCancelBody = NonNullable<
  paths['/v1/payouts/{payout}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPayoutsPayoutCancelResponse =
  paths['/v1/payouts/{payout}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_PAYOUTS_PAYOUT_CANCEL = new InjectionToken<
  (
    payout: string,
    body: PostPayoutsPayoutCancelBody | Signal<PostPayoutsPayoutCancelBody>,
  ) => ReturnType<typeof httpResource<PostPayoutsPayoutCancelResponse>>
>('POST_PAYOUTS_PAYOUT_CANCEL');

export function providePostPayoutsPayoutCancel(): FactoryProvider {
  return {
    provide: POST_PAYOUTS_PAYOUT_CANCEL,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        payout: string,
        body: PostPayoutsPayoutCancelBody | Signal<PostPayoutsPayoutCancelBody>,
      ) =>
        httpResource<PostPayoutsPayoutCancelResponse>(() => ({
          url: `${base}/v1/payouts/${payout}/cancel`,
          method: 'POST',
          body,
        }));
    },
  };
}
