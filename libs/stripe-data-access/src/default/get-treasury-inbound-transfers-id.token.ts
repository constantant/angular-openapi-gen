import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryInboundTransfersIdParams =
  paths['/v1/treasury/inbound_transfers/{id}']['get']['parameters']['query'];

export type GetTreasuryInboundTransfersIdResponse =
  paths['/v1/treasury/inbound_transfers/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_INBOUND_TRANSFERS_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetTreasuryInboundTransfersIdParams
      | (() => GetTreasuryInboundTransfersIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryInboundTransfersIdResponse>>
>('GET_TREASURY_INBOUND_TRANSFERS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      params?:
        | GetTreasuryInboundTransfersIdParams
        | (() => GetTreasuryInboundTransfersIdParams | undefined),
    ) =>
      httpResource<GetTreasuryInboundTransfersIdResponse>(() => ({
        url: `${base}/v1/treasury/inbound_transfers/${id}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
