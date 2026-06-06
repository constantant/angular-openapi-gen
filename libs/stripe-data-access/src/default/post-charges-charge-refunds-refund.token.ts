import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostChargesChargeRefundsRefundBody = NonNullable<
  paths['/v1/charges/{charge}/refunds/{refund}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostChargesChargeRefundsRefundResponse =
  paths['/v1/charges/{charge}/refunds/{refund}']['post']['responses']['200']['content']['application/json'];

export const POST_CHARGES_CHARGE_REFUNDS_REFUND = new InjectionToken<
  (
    charge: string,
    refund: string,
    body:
      | PostChargesChargeRefundsRefundBody
      | Signal<PostChargesChargeRefundsRefundBody>,
  ) => ReturnType<typeof httpResource<PostChargesChargeRefundsRefundResponse>>
>('POST_CHARGES_CHARGE_REFUNDS_REFUND', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      charge: string,
      refund: string,
      body:
        | PostChargesChargeRefundsRefundBody
        | Signal<PostChargesChargeRefundsRefundBody>,
    ) =>
      httpResource<PostChargesChargeRefundsRefundResponse>(() => ({
        url: `${base}/v1/charges/${charge}/refunds/${refund}`,
        method: 'POST',
        body,
      }));
  },
});
