import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetChargesChargeRefundsRefundParams =
  paths['/v1/charges/{charge}/refunds/{refund}']['get']['parameters']['query'];

type GetChargesChargeRefundsRefundResponse =
  paths['/v1/charges/{charge}/refunds/{refund}']['get']['responses']['200']['content']['application/json'];

export const GET_CHARGES_CHARGE_REFUNDS_REFUND = new InjectionToken<
  (
    charge: string,
    refund: string,
    params?: GetChargesChargeRefundsRefundParams,
  ) => ReturnType<typeof httpResource<GetChargesChargeRefundsRefundResponse>>
>('GET_CHARGES_CHARGE_REFUNDS_REFUND', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      charge: string,
      refund: string,
      params?: GetChargesChargeRefundsRefundParams,
    ) =>
      httpResource<GetChargesChargeRefundsRefundResponse>(() => ({
        url: `${base}/v1/charges/${charge}/refunds/${refund}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
