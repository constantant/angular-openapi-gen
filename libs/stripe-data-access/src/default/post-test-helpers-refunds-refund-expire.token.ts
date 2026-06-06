import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersRefundsRefundExpireBody = NonNullable<
  paths['/v1/test_helpers/refunds/{refund}/expire']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersRefundsRefundExpireResponse =
  paths['/v1/test_helpers/refunds/{refund}/expire']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_REFUNDS_REFUND_EXPIRE = new InjectionToken<
  (
    refund: string,
    body:
      | PostTestHelpersRefundsRefundExpireBody
      | Signal<PostTestHelpersRefundsRefundExpireBody>,
  ) => ReturnType<
    typeof httpResource<PostTestHelpersRefundsRefundExpireResponse>
  >
>('POST_TEST_HELPERS_REFUNDS_REFUND_EXPIRE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      refund: string,
      body:
        | PostTestHelpersRefundsRefundExpireBody
        | Signal<PostTestHelpersRefundsRefundExpireBody>,
    ) =>
      httpResource<PostTestHelpersRefundsRefundExpireResponse>(() => ({
        url: `${base}/v1/test_helpers/refunds/${refund}/expire`,
        method: 'POST',
        body,
      }));
  },
});
