import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingTransactionsTransactionRefundBody =
  NonNullable<
    paths['/v1/test_helpers/issuing/transactions/{transaction}/refund']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingTransactionsTransactionRefundResponse =
  paths['/v1/test_helpers/issuing/transactions/{transaction}/refund']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_TRANSACTIONS_TRANSACTION_REFUND =
  new InjectionToken<
    (
      transaction: string,
      body:
        | PostTestHelpersIssuingTransactionsTransactionRefundBody
        | Signal<PostTestHelpersIssuingTransactionsTransactionRefundBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingTransactionsTransactionRefundResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_TRANSACTIONS_TRANSACTION_REFUND');

export function providePostTestHelpersIssuingTransactionsTransactionRefund(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_ISSUING_TRANSACTIONS_TRANSACTION_REFUND,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        transaction: string,
        body:
          | PostTestHelpersIssuingTransactionsTransactionRefundBody
          | Signal<PostTestHelpersIssuingTransactionsTransactionRefundBody>,
      ) =>
        httpResource<PostTestHelpersIssuingTransactionsTransactionRefundResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/transactions/${transaction}/refund`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
