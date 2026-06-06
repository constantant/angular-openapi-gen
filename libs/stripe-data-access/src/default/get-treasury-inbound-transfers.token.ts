import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryInboundTransfersParams =
  paths['/v1/treasury/inbound_transfers']['get']['parameters']['query'];

export type GetTreasuryInboundTransfersResponse =
  paths['/v1/treasury/inbound_transfers']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_INBOUND_TRANSFERS = new InjectionToken<
  (
    params?:
      | GetTreasuryInboundTransfersParams
      | (() => GetTreasuryInboundTransfersParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryInboundTransfersResponse>>
>('GET_TREASURY_INBOUND_TRANSFERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetTreasuryInboundTransfersParams
        | (() => GetTreasuryInboundTransfersParams | undefined),
    ) =>
      httpResource<GetTreasuryInboundTransfersResponse>(() => ({
        url: `${base}/v1/treasury/inbound_transfers`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
