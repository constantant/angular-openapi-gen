import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostRefundsRefundCancelBody = NonNullable<
  paths['/v1/refunds/{refund}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostRefundsRefundCancelResponse =
  paths['/v1/refunds/{refund}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_REFUNDS_REFUND_CANCEL = new InjectionToken<
  (
    refund: string,
    body: PostRefundsRefundCancelBody | Signal<PostRefundsRefundCancelBody>,
  ) => ReturnType<typeof httpResource<PostRefundsRefundCancelResponse>>
>('POST_REFUNDS_REFUND_CANCEL');

export function providePostRefundsRefundCancel(): FactoryProvider {
  return {
    provide: POST_REFUNDS_REFUND_CANCEL,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        refund: string,
        body: PostRefundsRefundCancelBody | Signal<PostRefundsRefundCancelBody>,
      ) =>
        httpResource<PostRefundsRefundCancelResponse>(() => ({
          url: `${base}/v1/refunds/${refund}/cancel`,
          method: 'POST',
          body,
        }));
    },
  };
}
