import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTaxTransactionsTransactionLineItemsParams =
  paths['/v1/tax/transactions/{transaction}/line_items']['get']['parameters']['query'];

type GetTaxTransactionsTransactionLineItemsResponse =
  paths['/v1/tax/transactions/{transaction}/line_items']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_TRANSACTIONS_TRANSACTION_LINE_ITEMS = new InjectionToken<
  (
    transaction: string,
    params?: GetTaxTransactionsTransactionLineItemsParams,
  ) => ReturnType<
    typeof httpResource<GetTaxTransactionsTransactionLineItemsResponse>
  >
>('GET_TAX_TRANSACTIONS_TRANSACTION_LINE_ITEMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      transaction: string,
      params?: GetTaxTransactionsTransactionLineItemsParams,
    ) =>
      httpResource<GetTaxTransactionsTransactionLineItemsResponse>(() => ({
        url: `${base}/v1/tax/transactions/${transaction}/line_items`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
