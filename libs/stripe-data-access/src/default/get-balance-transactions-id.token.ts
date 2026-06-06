import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBalanceTransactionsIdParams =
  paths['/v1/balance_transactions/{id}']['get']['parameters']['query'];

export type GetBalanceTransactionsIdResponse =
  paths['/v1/balance_transactions/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_BALANCE_TRANSACTIONS_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetBalanceTransactionsIdParams
      | (() => GetBalanceTransactionsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetBalanceTransactionsIdResponse>>
>('GET_BALANCE_TRANSACTIONS_ID');

export function provideGetBalanceTransactionsId(): FactoryProvider {
  return {
    provide: GET_BALANCE_TRANSACTIONS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetBalanceTransactionsIdParams
          | (() => GetBalanceTransactionsIdParams | undefined),
      ) =>
        httpResource<GetBalanceTransactionsIdResponse>(() => ({
          url: `${base}/v1/balance_transactions/${id}`,
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
