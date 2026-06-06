import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetQuotesQuotePdfParams =
  paths['/v1/quotes/{quote}/pdf']['get']['parameters']['query'];

export const GET_QUOTES_QUOTE_PDF = new InjectionToken<
  (
    quote: string,
    params?:
      | GetQuotesQuotePdfParams
      | (() => GetQuotesQuotePdfParams | undefined),
  ) => ReturnType<typeof httpResource<unknown>>
>('GET_QUOTES_QUOTE_PDF');

export function provideGetQuotesQuotePdf(): FactoryProvider {
  return {
    provide: GET_QUOTES_QUOTE_PDF,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        quote: string,
        params?:
          | GetQuotesQuotePdfParams
          | (() => GetQuotesQuotePdfParams | undefined),
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/v1/quotes/${quote}/pdf`,
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
