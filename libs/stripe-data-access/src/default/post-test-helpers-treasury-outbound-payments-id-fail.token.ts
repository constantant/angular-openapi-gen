import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersTreasuryOutboundPaymentsIdFailBody = NonNullable<
  paths['/v1/test_helpers/treasury/outbound_payments/{id}/fail']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTestHelpersTreasuryOutboundPaymentsIdFailResponse =
  paths['/v1/test_helpers/treasury/outbound_payments/{id}/fail']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_OUTBOUND_PAYMENTS_ID_FAIL =
  new InjectionToken<
    (
      id: string,
      body:
        | PostTestHelpersTreasuryOutboundPaymentsIdFailBody
        | Signal<PostTestHelpersTreasuryOutboundPaymentsIdFailBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTreasuryOutboundPaymentsIdFailResponse>
    >
  >('POST_TEST_HELPERS_TREASURY_OUTBOUND_PAYMENTS_ID_FAIL', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostTestHelpersTreasuryOutboundPaymentsIdFailBody
          | Signal<PostTestHelpersTreasuryOutboundPaymentsIdFailBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryOutboundPaymentsIdFailResponse>(
          () => ({
            url: `${base}/v1/test_helpers/treasury/outbound_payments/${id}/fail`,
            method: 'POST',
            body,
          }),
        );
    },
  });
