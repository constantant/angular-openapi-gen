import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBalanceParams =
  paths['/v1/balance']['get']['parameters']['query'];

export type GetBalanceResponse =
  paths['/v1/balance']['get']['responses']['200']['content']['application/json'];

export const GET_BALANCE = new InjectionToken<
  (
    params?: GetBalanceParams | (() => GetBalanceParams | undefined),
  ) => ReturnType<typeof httpResource<GetBalanceResponse>>
>('GET_BALANCE');

export function provideGetBalance(): FactoryProvider {
  return {
    provide: GET_BALANCE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?: GetBalanceParams | (() => GetBalanceParams | undefined),
      ) =>
        httpResource<GetBalanceResponse>(() => ({
          url: `${base}/v1/balance`,
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
