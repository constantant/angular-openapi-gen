import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBalanceTransactionsParams =
  paths['/v1/balance_transactions']['get']['parameters']['query'];

type GetBalanceTransactionsResponse =
  paths['/v1/balance_transactions']['get']['responses']['200']['content']['application/json'];

export const GET_BALANCE_TRANSACTIONS = new InjectionToken<
  (
    params?: GetBalanceTransactionsParams,
  ) => ReturnType<typeof httpResource<GetBalanceTransactionsResponse>>
>('GET_BALANCE_TRANSACTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetBalanceTransactionsParams) =>
      httpResource<GetBalanceTransactionsResponse>(() => ({
        url: `${base}/v1/balance_transactions`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
