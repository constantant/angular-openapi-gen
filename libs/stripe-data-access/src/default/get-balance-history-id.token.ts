import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBalanceHistoryIdParams =
  paths['/v1/balance/history/{id}']['get']['parameters']['query'];

export type GetBalanceHistoryIdResponse =
  paths['/v1/balance/history/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_BALANCE_HISTORY_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetBalanceHistoryIdParams
      | (() => GetBalanceHistoryIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetBalanceHistoryIdResponse>>
>('GET_BALANCE_HISTORY_ID');

export function provideGetBalanceHistoryId(): FactoryProvider {
  return {
    provide: GET_BALANCE_HISTORY_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetBalanceHistoryIdParams
          | (() => GetBalanceHistoryIdParams | undefined),
      ) =>
        httpResource<GetBalanceHistoryIdResponse>(() => ({
          url: `${base}/v1/balance/history/${id}`,
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
