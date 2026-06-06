import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryTransactionsParams =
  paths['/v1/treasury/transactions']['get']['parameters']['query'];

export type GetTreasuryTransactionsResponse =
  paths['/v1/treasury/transactions']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_TRANSACTIONS = new InjectionToken<
  (
    params?:
      | GetTreasuryTransactionsParams
      | (() => GetTreasuryTransactionsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryTransactionsResponse>>
>('GET_TREASURY_TRANSACTIONS');

export function provideGetTreasuryTransactions(): FactoryProvider {
  return {
    provide: GET_TREASURY_TRANSACTIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetTreasuryTransactionsParams
          | (() => GetTreasuryTransactionsParams | undefined),
      ) =>
        httpResource<GetTreasuryTransactionsResponse>(() => ({
          url: `${base}/v1/treasury/transactions`,
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
