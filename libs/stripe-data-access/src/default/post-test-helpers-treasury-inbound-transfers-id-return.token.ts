import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTreasuryInboundTransfersIdReturnBody = NonNullable<
  paths['/v1/test_helpers/treasury/inbound_transfers/{id}/return']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTreasuryInboundTransfersIdReturnResponse =
  paths['/v1/test_helpers/treasury/inbound_transfers/{id}/return']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_INBOUND_TRANSFERS_ID_RETURN =
  new InjectionToken<
    (
      id: string,
      body:
        | PostTestHelpersTreasuryInboundTransfersIdReturnBody
        | Signal<PostTestHelpersTreasuryInboundTransfersIdReturnBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTreasuryInboundTransfersIdReturnResponse>
    >
  >('POST_TEST_HELPERS_TREASURY_INBOUND_TRANSFERS_ID_RETURN');

export function providePostTestHelpersTreasuryInboundTransfersIdReturn(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_TREASURY_INBOUND_TRANSFERS_ID_RETURN,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostTestHelpersTreasuryInboundTransfersIdReturnBody
          | Signal<PostTestHelpersTreasuryInboundTransfersIdReturnBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryInboundTransfersIdReturnResponse>(
          () => ({
            url: `${base}/v1/test_helpers/treasury/inbound_transfers/${id}/return`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
