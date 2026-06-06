import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSourcesSourceSourceTransactionsSourceTransactionParams =
  paths['/v1/sources/{source}/source_transactions/{source_transaction}']['get']['parameters']['query'];

type GetSourcesSourceSourceTransactionsSourceTransactionResponse =
  paths['/v1/sources/{source}/source_transactions/{source_transaction}']['get']['responses']['200']['content']['application/json'];

export const GET_SOURCES_SOURCE_SOURCE_TRANSACTIONS_SOURCE_TRANSACTION =
  new InjectionToken<
    (
      source: string,
      source_transaction: string,
      params?: GetSourcesSourceSourceTransactionsSourceTransactionParams,
    ) => ReturnType<
      typeof httpResource<GetSourcesSourceSourceTransactionsSourceTransactionResponse>
    >
  >('GET_SOURCES_SOURCE_SOURCE_TRANSACTIONS_SOURCE_TRANSACTION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        source: string,
        source_transaction: string,
        params?: GetSourcesSourceSourceTransactionsSourceTransactionParams,
      ) =>
        httpResource<GetSourcesSourceSourceTransactionsSourceTransactionResponse>(
          () => ({
            url: `${base}/v1/sources/${source}/source_transactions/${source_transaction}`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
