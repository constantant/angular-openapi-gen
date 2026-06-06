import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnBody =
  NonNullable<
    paths['/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnResponse =
  paths['/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER_RETURN =
  new InjectionToken<
    (
      outboundTransfer: string,
      body:
        | PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnBody
        | Signal<PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnResponse>
    >
  >('POST_TEST_HELPERS_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER_RETURN');

export function providePostTestHelpersTreasuryOutboundTransfersOutboundTransferReturn(): FactoryProvider {
  return {
    provide:
      POST_TEST_HELPERS_TREASURY_OUTBOUND_TRANSFERS_OUTBOUND_TRANSFER_RETURN,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        outboundTransfer: string,
        body:
          | PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnBody
          | Signal<PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnResponse>(
          () => ({
            url: `${base}/v1/test_helpers/treasury/outbound_transfers/${outboundTransfer}/return`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
