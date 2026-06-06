import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetIssuingTransactionsTransactionParams =
  paths['/v1/issuing/transactions/{transaction}']['get']['parameters']['query'];

type GetIssuingTransactionsTransactionResponse =
  paths['/v1/issuing/transactions/{transaction}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_TRANSACTIONS_TRANSACTION = new InjectionToken<
  (
    transaction: string,
    params?: GetIssuingTransactionsTransactionParams,
  ) => ReturnType<
    typeof httpResource<GetIssuingTransactionsTransactionResponse>
  >
>('GET_ISSUING_TRANSACTIONS_TRANSACTION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      transaction: string,
      params?: GetIssuingTransactionsTransactionParams,
    ) =>
      httpResource<GetIssuingTransactionsTransactionResponse>(() => ({
        url: `${base}/v1/issuing/transactions/${transaction}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
