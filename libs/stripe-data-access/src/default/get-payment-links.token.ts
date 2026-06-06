import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPaymentLinksParams =
  paths['/v1/payment_links']['get']['parameters']['query'];

export type GetPaymentLinksResponse =
  paths['/v1/payment_links']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_LINKS = new InjectionToken<
  (
    params?: GetPaymentLinksParams | (() => GetPaymentLinksParams | undefined),
  ) => ReturnType<typeof httpResource<GetPaymentLinksResponse>>
>('GET_PAYMENT_LINKS');

export function provideGetPaymentLinks(): FactoryProvider {
  return {
    provide: GET_PAYMENT_LINKS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetPaymentLinksParams
          | (() => GetPaymentLinksParams | undefined),
      ) =>
        httpResource<GetPaymentLinksResponse>(() => ({
          url: `${base}/v1/payment_links`,
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
