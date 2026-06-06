import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingCardsCardParams =
  paths['/v1/issuing/cards/{card}']['get']['parameters']['query'];

export type GetIssuingCardsCardResponse =
  paths['/v1/issuing/cards/{card}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_CARDS_CARD = new InjectionToken<
  (
    card: string,
    params?:
      | GetIssuingCardsCardParams
      | (() => GetIssuingCardsCardParams | undefined),
  ) => ReturnType<typeof httpResource<GetIssuingCardsCardResponse>>
>('GET_ISSUING_CARDS_CARD');

export function provideGetIssuingCardsCard(): FactoryProvider {
  return {
    provide: GET_ISSUING_CARDS_CARD,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        card: string,
        params?:
          | GetIssuingCardsCardParams
          | (() => GetIssuingCardsCardParams | undefined),
      ) =>
        httpResource<GetIssuingCardsCardResponse>(() => ({
          url: `${base}/v1/issuing/cards/${card}`,
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
