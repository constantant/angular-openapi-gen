import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostRefundsRefundBody = NonNullable<
  paths['/v1/refunds/{refund}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostRefundsRefundResponse =
  paths['/v1/refunds/{refund}']['post']['responses']['200']['content']['application/json'];

export const POST_REFUNDS_REFUND = new InjectionToken<
  (
    refund: string,
    body: PostRefundsRefundBody | Signal<PostRefundsRefundBody>,
  ) => ReturnType<typeof httpResource<PostRefundsRefundResponse>>
>('POST_REFUNDS_REFUND', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      refund: string,
      body: PostRefundsRefundBody | Signal<PostRefundsRefundBody>,
    ) =>
      httpResource<PostRefundsRefundResponse>(() => ({
        url: `${base}/v1/refunds/${refund}`,
        method: 'POST',
        body,
      }));
  },
});
