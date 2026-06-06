import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostBody =
  NonNullable<
    paths['/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

type PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostResponse =
  paths['/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER_POST =
  new InjectionToken<
    (
      outbound_transfer: string,
      body:
        | PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostBody
        | Signal<PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostResponse>
    >
  >('POST_TEST_HELPERS_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER_POST', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        outbound_transfer: string,
        body:
          | PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostBody
          | Signal<PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostResponse>(
          () => ({
            url: `${base}/v1/test_helpers/treasury/outbound_transfers/${outbound_transfer}/post`,
            method: 'POST',
            body,
          }),
        );
    },
  });
