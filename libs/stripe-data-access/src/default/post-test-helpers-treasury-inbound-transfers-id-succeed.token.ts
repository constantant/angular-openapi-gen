import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTreasuryInboundTransfersIdSucceedBody = NonNullable<
  paths['/v1/test_helpers/treasury/inbound_transfers/{id}/succeed']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTreasuryInboundTransfersIdSucceedResponse =
  paths['/v1/test_helpers/treasury/inbound_transfers/{id}/succeed']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_INBOUND_TRANSFERS_ID_SUCCEED =
  new InjectionToken<
    (
      id: string,
      body:
        | PostTestHelpersTreasuryInboundTransfersIdSucceedBody
        | Signal<PostTestHelpersTreasuryInboundTransfersIdSucceedBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTreasuryInboundTransfersIdSucceedResponse>
    >
  >('POST_TEST_HELPERS_TREASURY_INBOUND_TRANSFERS_ID_SUCCEED');

export function providePostTestHelpersTreasuryInboundTransfersIdSucceed(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_TREASURY_INBOUND_TRANSFERS_ID_SUCCEED,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostTestHelpersTreasuryInboundTransfersIdSucceedBody
          | Signal<PostTestHelpersTreasuryInboundTransfersIdSucceedBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryInboundTransfersIdSucceedResponse>(
          () => ({
            url: `${base}/v1/test_helpers/treasury/inbound_transfers/${id}/succeed`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
