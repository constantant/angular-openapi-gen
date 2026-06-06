import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryTransactionEntriesIdParams =
  paths['/v1/treasury/transaction_entries/{id}']['get']['parameters']['query'];

export type GetTreasuryTransactionEntriesIdResponse =
  paths['/v1/treasury/transaction_entries/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_TRANSACTION_ENTRIES_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetTreasuryTransactionEntriesIdParams
      | (() => GetTreasuryTransactionEntriesIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryTransactionEntriesIdResponse>>
>('GET_TREASURY_TRANSACTION_ENTRIES_ID');

export function provideGetTreasuryTransactionEntriesId(): FactoryProvider {
  return {
    provide: GET_TREASURY_TRANSACTION_ENTRIES_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetTreasuryTransactionEntriesIdParams
          | (() => GetTreasuryTransactionEntriesIdParams | undefined),
      ) =>
        httpResource<GetTreasuryTransactionEntriesIdResponse>(() => ({
          url: `${base}/v1/treasury/transaction_entries/${id}`,
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
