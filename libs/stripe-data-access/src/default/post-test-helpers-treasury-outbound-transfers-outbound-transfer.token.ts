import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersTreasuryOutboundTransfersOutboundTransferBody = NonNullable<
  paths['/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTestHelpersTreasuryOutboundTransfersOutboundTransferResponse =
  paths['/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER =
  new InjectionToken<
    (
      outbound_transfer: string,
      body:
        | PostTestHelpersTreasuryOutboundTransfersOutboundTransferBody
        | Signal<PostTestHelpersTreasuryOutboundTransfersOutboundTransferBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTreasuryOutboundTransfersOutboundTransferResponse>
    >
  >('POST_TEST_HELPERS_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        outbound_transfer: string,
        body:
          | PostTestHelpersTreasuryOutboundTransfersOutboundTransferBody
          | Signal<PostTestHelpersTreasuryOutboundTransfersOutboundTransferBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryOutboundTransfersOutboundTransferResponse>(
          () => ({
            url: `${base}/v1/test_helpers/treasury/outbound_transfers/${outbound_transfer}`,
            method: 'POST',
            body,
          }),
        );
    },
  });
