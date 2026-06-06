import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetShippingRatesParams =
  paths['/v1/shipping_rates']['get']['parameters']['query'];

export type GetShippingRatesResponse =
  paths['/v1/shipping_rates']['get']['responses']['200']['content']['application/json'];

export const GET_SHIPPING_RATES = new InjectionToken<
  (
    params?:
      | GetShippingRatesParams
      | (() => GetShippingRatesParams | undefined),
  ) => ReturnType<typeof httpResource<GetShippingRatesResponse>>
>('GET_SHIPPING_RATES');

export function provideGetShippingRates(): FactoryProvider {
  return {
    provide: GET_SHIPPING_RATES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetShippingRatesParams
          | (() => GetShippingRatesParams | undefined),
      ) =>
        httpResource<GetShippingRatesResponse>(() => ({
          url: `${base}/v1/shipping_rates`,
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
