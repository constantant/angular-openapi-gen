import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryOutboundPaymentsIdParams =
  paths['/v1/treasury/outbound_payments/{id}']['get']['parameters']['query'];

export type GetTreasuryOutboundPaymentsIdResponse =
  paths['/v1/treasury/outbound_payments/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_OUTBOUND_PAYMENTS_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetTreasuryOutboundPaymentsIdParams
      | (() => GetTreasuryOutboundPaymentsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryOutboundPaymentsIdResponse>>
>('GET_TREASURY_OUTBOUND_PAYMENTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      params?:
        | GetTreasuryOutboundPaymentsIdParams
        | (() => GetTreasuryOutboundPaymentsIdParams | undefined),
    ) =>
      httpResource<GetTreasuryOutboundPaymentsIdResponse>(() => ({
        url: `${base}/v1/treasury/outbound_payments/${id}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
