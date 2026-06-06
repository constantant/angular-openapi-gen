import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBalanceTransactionsParams =
  paths['/v1/balance_transactions']['get']['parameters']['query'];

export type GetBalanceTransactionsResponse =
  paths['/v1/balance_transactions']['get']['responses']['200']['content']['application/json'];

export const GET_BALANCE_TRANSACTIONS = new InjectionToken<
  (
    params?:
      | GetBalanceTransactionsParams
      | (() => GetBalanceTransactionsParams | undefined),
  ) => ReturnType<typeof httpResource<GetBalanceTransactionsResponse>>
>('GET_BALANCE_TRANSACTIONS');

export function provideGetBalanceTransactions(): FactoryProvider {
  return {
    provide: GET_BALANCE_TRANSACTIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetBalanceTransactionsParams
          | (() => GetBalanceTransactionsParams | undefined),
      ) =>
        httpResource<GetBalanceTransactionsResponse>(() => ({
          url: `${base}/v1/balance_transactions`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
