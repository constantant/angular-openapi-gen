import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetRefundsRefundParams =
  paths['/v1/refunds/{refund}']['get']['parameters']['query'];

type GetRefundsRefundResponse =
  paths['/v1/refunds/{refund}']['get']['responses']['200']['content']['application/json'];

export const GET_REFUNDS_REFUND = new InjectionToken<
  (
    refund: string,
    params?: GetRefundsRefundParams,
  ) => ReturnType<typeof httpResource<GetRefundsRefundResponse>>
>('GET_REFUNDS_REFUND', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (refund: string, params?: GetRefundsRefundParams) =>
      httpResource<GetRefundsRefundResponse>(() => ({
        url: `${base}/v1/refunds/${refund}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
