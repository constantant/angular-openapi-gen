import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingCardsBody = NonNullable<
  paths['/v1/issuing/cards']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIssuingCardsResponse =
  paths['/v1/issuing/cards']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_CARDS = new InjectionToken<
  (
    body: PostIssuingCardsBody | Signal<PostIssuingCardsBody>,
  ) => ReturnType<typeof httpResource<PostIssuingCardsResponse>>
>('POST_ISSUING_CARDS');

export function providePostIssuingCards(): FactoryProvider {
  return {
    provide: POST_ISSUING_CARDS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostIssuingCardsBody | Signal<PostIssuingCardsBody>) =>
        httpResource<PostIssuingCardsResponse>(() => ({
          url: `${base}/v1/issuing/cards`,
          method: 'POST',
          body,
        }));
    },
  };
}
