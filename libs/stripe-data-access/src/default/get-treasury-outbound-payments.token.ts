import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTreasuryOutboundPaymentsParams =
  paths['/v1/treasury/outbound_payments']['get']['parameters']['query'];

type GetTreasuryOutboundPaymentsResponse =
  paths['/v1/treasury/outbound_payments']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_OUTBOUND_PAYMENTS = new InjectionToken<
  (
    params?: GetTreasuryOutboundPaymentsParams,
  ) => ReturnType<typeof httpResource<GetTreasuryOutboundPaymentsResponse>>
>('GET_TREASURY_OUTBOUND_PAYMENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTreasuryOutboundPaymentsParams) =>
      httpResource<GetTreasuryOutboundPaymentsResponse>(() => ({
        url: `${base}/v1/treasury/outbound_payments`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
