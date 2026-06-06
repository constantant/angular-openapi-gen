import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryOutboundTransfersOutboundTransferParams =
  paths['/v1/treasury/outbound_transfers/{outbound_transfer}']['get']['parameters']['query'];

export type GetTreasuryOutboundTransfersOutboundTransferResponse =
  paths['/v1/treasury/outbound_transfers/{outbound_transfer}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER =
  new InjectionToken<
    (
      outboundTransfer: string,
      params?:
        | GetTreasuryOutboundTransfersOutboundTransferParams
        | (() =>
            | GetTreasuryOutboundTransfersOutboundTransferParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<GetTreasuryOutboundTransfersOutboundTransferResponse>
    >
  >('GET_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER');

export function provideGetTreasuryOutboundTransfersOutboundTransfer(): FactoryProvider {
  return {
    provide: GET_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        outboundTransfer: string,
        params?:
          | GetTreasuryOutboundTransfersOutboundTransferParams
          | (() =>
              | GetTreasuryOutboundTransfersOutboundTransferParams
              | undefined),
      ) =>
        httpResource<GetTreasuryOutboundTransfersOutboundTransferResponse>(
          () => ({
            url: `${base}/v1/treasury/outbound_transfers/${outboundTransfer}`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
