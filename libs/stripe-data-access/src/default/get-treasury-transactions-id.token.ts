import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryTransactionsIdParams =
  paths['/v1/treasury/transactions/{id}']['get']['parameters']['query'];

export type GetTreasuryTransactionsIdResponse =
  paths['/v1/treasury/transactions/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_TRANSACTIONS_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetTreasuryTransactionsIdParams
      | (() => GetTreasuryTransactionsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryTransactionsIdResponse>>
>('GET_TREASURY_TRANSACTIONS_ID');

export function provideGetTreasuryTransactionsId(): FactoryProvider {
  return {
    provide: GET_TREASURY_TRANSACTIONS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetTreasuryTransactionsIdParams
          | (() => GetTreasuryTransactionsIdParams | undefined),
      ) =>
        httpResource<GetTreasuryTransactionsIdResponse>(() => ({
          url: `${base}/v1/treasury/transactions/${id}`,
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
