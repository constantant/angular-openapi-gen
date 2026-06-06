import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetExchangeRatesParams =
  paths['/v1/exchange_rates']['get']['parameters']['query'];

export type GetExchangeRatesResponse =
  paths['/v1/exchange_rates']['get']['responses']['200']['content']['application/json'];

export const GET_EXCHANGE_RATES = new InjectionToken<
  (
    params?:
      | GetExchangeRatesParams
      | (() => GetExchangeRatesParams | undefined),
  ) => ReturnType<typeof httpResource<GetExchangeRatesResponse>>
>('GET_EXCHANGE_RATES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetExchangeRatesParams
        | (() => GetExchangeRatesParams | undefined),
    ) =>
      httpResource<GetExchangeRatesResponse>(() => ({
        url: `${base}/v1/exchange_rates`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
