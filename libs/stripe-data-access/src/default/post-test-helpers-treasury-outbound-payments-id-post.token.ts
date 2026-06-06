import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTreasuryOutboundPaymentsIdPostBody = NonNullable<
  paths['/v1/test_helpers/treasury/outbound_payments/{id}/post']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTreasuryOutboundPaymentsIdPostResponse =
  paths['/v1/test_helpers/treasury/outbound_payments/{id}/post']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_OUTBOUND_PAYMENTS_ID_POST =
  new InjectionToken<
    (
      id: string,
      body:
        | PostTestHelpersTreasuryOutboundPaymentsIdPostBody
        | Signal<PostTestHelpersTreasuryOutboundPaymentsIdPostBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTreasuryOutboundPaymentsIdPostResponse>
    >
  >('POST_TEST_HELPERS_TREASURY_OUTBOUND_PAYMENTS_ID_POST');

export function providePostTestHelpersTreasuryOutboundPaymentsIdPost(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_TREASURY_OUTBOUND_PAYMENTS_ID_POST,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostTestHelpersTreasuryOutboundPaymentsIdPostBody
          | Signal<PostTestHelpersTreasuryOutboundPaymentsIdPostBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryOutboundPaymentsIdPostResponse>(
          () => ({
            url: `${base}/v1/test_helpers/treasury/outbound_payments/${id}/post`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
