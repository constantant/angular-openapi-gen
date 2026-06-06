import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTreasuryTransactionsIdParams =
  paths['/v1/treasury/transactions/{id}']['get']['parameters']['query'];

type GetTreasuryTransactionsIdResponse =
  paths['/v1/treasury/transactions/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_TRANSACTIONS_ID = new InjectionToken<
  (
    id: string,
    params?: GetTreasuryTransactionsIdParams,
  ) => ReturnType<typeof httpResource<GetTreasuryTransactionsIdResponse>>
>('GET_TREASURY_TRANSACTIONS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetTreasuryTransactionsIdParams) =>
      httpResource<GetTreasuryTransactionsIdResponse>(() => ({
        url: `${base}/v1/treasury/transactions/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
