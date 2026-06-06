import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetExchangeRatesRateIdParams =
  paths['/v1/exchange_rates/{rate_id}']['get']['parameters']['query'];

type GetExchangeRatesRateIdResponse =
  paths['/v1/exchange_rates/{rate_id}']['get']['responses']['200']['content']['application/json'];

export const GET_EXCHANGE_RATES_RATE_ID = new InjectionToken<
  (
    rate_id: string,
    params?: GetExchangeRatesRateIdParams,
  ) => ReturnType<typeof httpResource<GetExchangeRatesRateIdResponse>>
>('GET_EXCHANGE_RATES_RATE_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (rate_id: string, params?: GetExchangeRatesRateIdParams) =>
      httpResource<GetExchangeRatesRateIdResponse>(() => ({
        url: `${base}/v1/exchange_rates/${rate_id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
