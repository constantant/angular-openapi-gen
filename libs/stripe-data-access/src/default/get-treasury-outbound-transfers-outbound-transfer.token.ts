import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTreasuryOutboundTransfersOutboundTransferParams =
  paths['/v1/treasury/outbound_transfers/{outbound_transfer}']['get']['parameters']['query'];

type GetTreasuryOutboundTransfersOutboundTransferResponse =
  paths['/v1/treasury/outbound_transfers/{outbound_transfer}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER =
  new InjectionToken<
    (
      outbound_transfer: string,
      params?: GetTreasuryOutboundTransfersOutboundTransferParams,
    ) => ReturnType<
      typeof httpResource<GetTreasuryOutboundTransfersOutboundTransferResponse>
    >
  >('GET_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        outbound_transfer: string,
        params?: GetTreasuryOutboundTransfersOutboundTransferParams,
      ) =>
        httpResource<GetTreasuryOutboundTransfersOutboundTransferResponse>(
          () => ({
            url: `${base}/v1/treasury/outbound_transfers/${outbound_transfer}`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
