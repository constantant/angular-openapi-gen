import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBalanceHistoryParams =
  paths['/v1/balance/history']['get']['parameters']['query'];

export type GetBalanceHistoryResponse =
  paths['/v1/balance/history']['get']['responses']['200']['content']['application/json'];

export const GET_BALANCE_HISTORY = new InjectionToken<
  (
    params?:
      | GetBalanceHistoryParams
      | (() => GetBalanceHistoryParams | undefined),
  ) => ReturnType<typeof httpResource<GetBalanceHistoryResponse>>
>('GET_BALANCE_HISTORY');

export function provideGetBalanceHistory(): FactoryProvider {
  return {
    provide: GET_BALANCE_HISTORY,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetBalanceHistoryParams
          | (() => GetBalanceHistoryParams | undefined),
      ) =>
        httpResource<GetBalanceHistoryResponse>(() => ({
          url: `${base}/v1/balance/history`,
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
