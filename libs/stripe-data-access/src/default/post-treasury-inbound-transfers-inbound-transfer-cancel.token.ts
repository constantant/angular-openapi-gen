import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTreasuryInboundTransfersInboundTransferCancelBody = NonNullable<
  paths['/v1/treasury/inbound_transfers/{inbound_transfer}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTreasuryInboundTransfersInboundTransferCancelResponse =
  paths['/v1/treasury/inbound_transfers/{inbound_transfer}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_INBOUND_TRANSFERS_INBOUND_TRANSFER_CANCEL =
  new InjectionToken<
    (
      inboundTransfer: string,
      body:
        | PostTreasuryInboundTransfersInboundTransferCancelBody
        | Signal<PostTreasuryInboundTransfersInboundTransferCancelBody>,
    ) => ReturnType<
      typeof httpResource<PostTreasuryInboundTransfersInboundTransferCancelResponse>
    >
  >('POST_TREASURY_INBOUND_TRANSFERS_INBOUND_TRANSFER_CANCEL', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        inboundTransfer: string,
        body:
          | PostTreasuryInboundTransfersInboundTransferCancelBody
          | Signal<PostTreasuryInboundTransfersInboundTransferCancelBody>,
      ) =>
        httpResource<PostTreasuryInboundTransfersInboundTransferCancelResponse>(
          () => ({
            url: `${base}/v1/treasury/inbound_transfers/${inboundTransfer}/cancel`,
            method: 'POST',
            body,
          }),
        );
    },
  });
