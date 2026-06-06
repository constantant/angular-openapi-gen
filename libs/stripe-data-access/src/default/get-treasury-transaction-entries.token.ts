import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryTransactionEntriesParams =
  paths['/v1/treasury/transaction_entries']['get']['parameters']['query'];

export type GetTreasuryTransactionEntriesResponse =
  paths['/v1/treasury/transaction_entries']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_TRANSACTION_ENTRIES = new InjectionToken<
  (
    params?:
      | GetTreasuryTransactionEntriesParams
      | (() => GetTreasuryTransactionEntriesParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryTransactionEntriesResponse>>
>('GET_TREASURY_TRANSACTION_ENTRIES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetTreasuryTransactionEntriesParams
        | (() => GetTreasuryTransactionEntriesParams | undefined),
    ) =>
      httpResource<GetTreasuryTransactionEntriesResponse>(() => ({
        url: `${base}/v1/treasury/transaction_entries`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
