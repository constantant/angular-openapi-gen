import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTreasuryOutboundPaymentsIdReturnBody = NonNullable<
  paths['/v1/test_helpers/treasury/outbound_payments/{id}/return']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTreasuryOutboundPaymentsIdReturnResponse =
  paths['/v1/test_helpers/treasury/outbound_payments/{id}/return']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_OUTBOUND_PAYMENTS_ID_RETURN =
  new InjectionToken<
    (
      id: string,
      body:
        | PostTestHelpersTreasuryOutboundPaymentsIdReturnBody
        | Signal<PostTestHelpersTreasuryOutboundPaymentsIdReturnBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTreasuryOutboundPaymentsIdReturnResponse>
    >
  >('POST_TEST_HELPERS_TREASURY_OUTBOUND_PAYMENTS_ID_RETURN', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostTestHelpersTreasuryOutboundPaymentsIdReturnBody
          | Signal<PostTestHelpersTreasuryOutboundPaymentsIdReturnBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryOutboundPaymentsIdReturnResponse>(
          () => ({
            url: `${base}/v1/test_helpers/treasury/outbound_payments/${id}/return`,
            method: 'POST',
            body,
          }),
        );
    },
  });
