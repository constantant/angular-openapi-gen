import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersTreasuryOutboundPaymentsIdBody = NonNullable<
  paths['/v1/test_helpers/treasury/outbound_payments/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTestHelpersTreasuryOutboundPaymentsIdResponse =
  paths['/v1/test_helpers/treasury/outbound_payments/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_OUTBOUND_PAYMENTS_ID =
  new InjectionToken<
    (
      id: string,
      body:
        | PostTestHelpersTreasuryOutboundPaymentsIdBody
        | Signal<PostTestHelpersTreasuryOutboundPaymentsIdBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTreasuryOutboundPaymentsIdResponse>
    >
  >('POST_TEST_HELPERS_TREASURY_OUTBOUND_PAYMENTS_ID', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostTestHelpersTreasuryOutboundPaymentsIdBody
          | Signal<PostTestHelpersTreasuryOutboundPaymentsIdBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryOutboundPaymentsIdResponse>(() => ({
          url: `${base}/v1/test_helpers/treasury/outbound_payments/${id}`,
          method: 'POST',
          body,
        }));
    },
  });
