import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBalanceHistoryParams =
  paths['/v1/balance/history']['get']['parameters']['query'];

type GetBalanceHistoryResponse =
  paths['/v1/balance/history']['get']['responses']['200']['content']['application/json'];

export const GET_BALANCE_HISTORY = new InjectionToken<
  (
    params?: GetBalanceHistoryParams,
  ) => ReturnType<typeof httpResource<GetBalanceHistoryResponse>>
>('GET_BALANCE_HISTORY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetBalanceHistoryParams) =>
      httpResource<GetBalanceHistoryResponse>(() => ({
        url: `${base}/v1/balance/history`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
