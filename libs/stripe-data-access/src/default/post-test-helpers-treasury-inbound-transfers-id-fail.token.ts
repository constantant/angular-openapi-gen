import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTreasuryInboundTransfersIdFailBody = NonNullable<
  paths['/v1/test_helpers/treasury/inbound_transfers/{id}/fail']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTreasuryInboundTransfersIdFailResponse =
  paths['/v1/test_helpers/treasury/inbound_transfers/{id}/fail']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_INBOUND_TRANSFERS_ID_FAIL =
  new InjectionToken<
    (
      id: string,
      body:
        | PostTestHelpersTreasuryInboundTransfersIdFailBody
        | Signal<PostTestHelpersTreasuryInboundTransfersIdFailBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTreasuryInboundTransfersIdFailResponse>
    >
  >('POST_TEST_HELPERS_TREASURY_INBOUND_TRANSFERS_ID_FAIL', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostTestHelpersTreasuryInboundTransfersIdFailBody
          | Signal<PostTestHelpersTreasuryInboundTransfersIdFailBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryInboundTransfersIdFailResponse>(
          () => ({
            url: `${base}/v1/test_helpers/treasury/inbound_transfers/${id}/fail`,
            method: 'POST',
            body,
          }),
        );
    },
  });
