import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetQuotesParams = paths['/v1/quotes']['get']['parameters']['query'];

export type GetQuotesResponse =
  paths['/v1/quotes']['get']['responses']['200']['content']['application/json'];

export const GET_QUOTES = new InjectionToken<
  (
    params?: GetQuotesParams | (() => GetQuotesParams | undefined),
  ) => ReturnType<typeof httpResource<GetQuotesResponse>>
>('GET_QUOTES');

export function provideGetQuotes(): FactoryProvider {
  return {
    provide: GET_QUOTES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (params?: GetQuotesParams | (() => GetQuotesParams | undefined)) =>
        httpResource<GetQuotesResponse>(() => ({
          url: `${base}/v1/quotes`,
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
