import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailBody =
  NonNullable<
    paths['/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

type PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailResponse =
  paths['/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER_FAIL =
  new InjectionToken<
    (
      outbound_transfer: string,
      body:
        | PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailBody
        | Signal<PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailResponse>
    >
  >('POST_TEST_HELPERS_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER_FAIL', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        outbound_transfer: string,
        body:
          | PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailBody
          | Signal<PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailResponse>(
          () => ({
            url: `${base}/v1/test_helpers/treasury/outbound_transfers/${outbound_transfer}/fail`,
            method: 'POST',
            body,
          }),
        );
    },
  });
