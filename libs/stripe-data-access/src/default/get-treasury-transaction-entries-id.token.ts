import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTreasuryTransactionEntriesIdParams =
  paths['/v1/treasury/transaction_entries/{id}']['get']['parameters']['query'];

type GetTreasuryTransactionEntriesIdResponse =
  paths['/v1/treasury/transaction_entries/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_TRANSACTION_ENTRIES_ID = new InjectionToken<
  (
    id: string,
    params?: GetTreasuryTransactionEntriesIdParams,
  ) => ReturnType<typeof httpResource<GetTreasuryTransactionEntriesIdResponse>>
>('GET_TREASURY_TRANSACTION_ENTRIES_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetTreasuryTransactionEntriesIdParams) =>
      httpResource<GetTreasuryTransactionEntriesIdResponse>(() => ({
        url: `${base}/v1/treasury/transaction_entries/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
