import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetExchangeRatesRateIdParams =
  paths['/v1/exchange_rates/{rate_id}']['get']['parameters']['query'];

export type GetExchangeRatesRateIdResponse =
  paths['/v1/exchange_rates/{rate_id}']['get']['responses']['200']['content']['application/json'];

export const GET_EXCHANGE_RATES_RATE_ID = new InjectionToken<
  (
    rateId: string,
    params?:
      | GetExchangeRatesRateIdParams
      | (() => GetExchangeRatesRateIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetExchangeRatesRateIdResponse>>
>('GET_EXCHANGE_RATES_RATE_ID');

export function provideGetExchangeRatesRateId(): FactoryProvider {
  return {
    provide: GET_EXCHANGE_RATES_RATE_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        rateId: string,
        params?:
          | GetExchangeRatesRateIdParams
          | (() => GetExchangeRatesRateIdParams | undefined),
      ) =>
        httpResource<GetExchangeRatesRateIdResponse>(() => ({
          url: `${base}/v1/exchange_rates/${rateId}`,
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
