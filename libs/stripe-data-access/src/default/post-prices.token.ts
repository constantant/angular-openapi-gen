import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPricesBody = NonNullable<
  paths['/v1/prices']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPricesResponse =
  paths['/v1/prices']['post']['responses']['200']['content']['application/json'];

export const POST_PRICES = new InjectionToken<
  (
    body: PostPricesBody | Signal<PostPricesBody>,
  ) => ReturnType<typeof httpResource<PostPricesResponse>>
>('POST_PRICES');

export function providePostPrices(): FactoryProvider {
  return {
    provide: POST_PRICES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostPricesBody | Signal<PostPricesBody>) =>
        httpResource<PostPricesResponse>(() => ({
          url: `${base}/v1/prices`,
          method: 'POST',
          body,
        }));
    },
  };
}
