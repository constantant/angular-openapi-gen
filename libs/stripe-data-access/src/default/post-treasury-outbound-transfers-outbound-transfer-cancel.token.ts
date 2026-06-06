import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTreasuryOutboundTransfersOutboundTransferCancelBody = NonNullable<
  paths['/v1/treasury/outbound_transfers/{outbound_transfer}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTreasuryOutboundTransfersOutboundTransferCancelResponse =
  paths['/v1/treasury/outbound_transfers/{outbound_transfer}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER_CANCEL =
  new InjectionToken<
    (
      outbound_transfer: string,
      body:
        | PostTreasuryOutboundTransfersOutboundTransferCancelBody
        | Signal<PostTreasuryOutboundTransfersOutboundTransferCancelBody>,
    ) => ReturnType<
      typeof httpResource<PostTreasuryOutboundTransfersOutboundTransferCancelResponse>
    >
  >('POST_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER_CANCEL', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        outbound_transfer: string,
        body:
          | PostTreasuryOutboundTransfersOutboundTransferCancelBody
          | Signal<PostTreasuryOutboundTransfersOutboundTransferCancelBody>,
      ) =>
        httpResource<PostTreasuryOutboundTransfersOutboundTransferCancelResponse>(
          () => ({
            url: `${base}/v1/treasury/outbound_transfers/${outbound_transfer}/cancel`,
            method: 'POST',
            body,
          }),
        );
    },
  });
