import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingCardsCardBody = NonNullable<
  paths['/v1/issuing/cards/{card}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIssuingCardsCardResponse =
  paths['/v1/issuing/cards/{card}']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_CARDS_CARD = new InjectionToken<
  (
    card: string,
    body: PostIssuingCardsCardBody | Signal<PostIssuingCardsCardBody>,
  ) => ReturnType<typeof httpResource<PostIssuingCardsCardResponse>>
>('POST_ISSUING_CARDS_CARD');

export function providePostIssuingCardsCard(): FactoryProvider {
  return {
    provide: POST_ISSUING_CARDS_CARD,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        card: string,
        body: PostIssuingCardsCardBody | Signal<PostIssuingCardsCardBody>,
      ) =>
        httpResource<PostIssuingCardsCardResponse>(() => ({
          url: `${base}/v1/issuing/cards/${card}`,
          method: 'POST',
          body,
        }));
    },
  };
}
