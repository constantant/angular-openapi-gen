import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingTransactionsTransactionBody = NonNullable<
  paths['/v1/issuing/transactions/{transaction}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIssuingTransactionsTransactionResponse =
  paths['/v1/issuing/transactions/{transaction}']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_TRANSACTIONS_TRANSACTION = new InjectionToken<
  (
    transaction: string,
    body:
      | PostIssuingTransactionsTransactionBody
      | Signal<PostIssuingTransactionsTransactionBody>,
  ) => ReturnType<
    typeof httpResource<PostIssuingTransactionsTransactionResponse>
  >
>('POST_ISSUING_TRANSACTIONS_TRANSACTION');

export function providePostIssuingTransactionsTransaction(): FactoryProvider {
  return {
    provide: POST_ISSUING_TRANSACTIONS_TRANSACTION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        transaction: string,
        body:
          | PostIssuingTransactionsTransactionBody
          | Signal<PostIssuingTransactionsTransactionBody>,
      ) =>
        httpResource<PostIssuingTransactionsTransactionResponse>(() => ({
          url: `${base}/v1/issuing/transactions/${transaction}`,
          method: 'POST',
          body,
        }));
    },
  };
}
