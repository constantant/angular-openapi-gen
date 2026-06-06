import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPricesPriceBody = NonNullable<
  paths['/v1/prices/{price}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPricesPriceResponse =
  paths['/v1/prices/{price}']['post']['responses']['200']['content']['application/json'];

export const POST_PRICES_PRICE = new InjectionToken<
  (
    price: string,
    body: PostPricesPriceBody | Signal<PostPricesPriceBody>,
  ) => ReturnType<typeof httpResource<PostPricesPriceResponse>>
>('POST_PRICES_PRICE');

export function providePostPricesPrice(): FactoryProvider {
  return {
    provide: POST_PRICES_PRICE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        price: string,
        body: PostPricesPriceBody | Signal<PostPricesPriceBody>,
      ) =>
        httpResource<PostPricesPriceResponse>(() => ({
          url: `${base}/v1/prices/${price}`,
          method: 'POST',
          body,
        }));
    },
  };
}
