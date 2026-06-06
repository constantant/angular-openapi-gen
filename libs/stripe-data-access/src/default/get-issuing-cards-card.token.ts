import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetIssuingCardsCardParams =
  paths['/v1/issuing/cards/{card}']['get']['parameters']['query'];

type GetIssuingCardsCardResponse =
  paths['/v1/issuing/cards/{card}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_CARDS_CARD = new InjectionToken<
  (
    card: string,
    params?: GetIssuingCardsCardParams,
  ) => ReturnType<typeof httpResource<GetIssuingCardsCardResponse>>
>('GET_ISSUING_CARDS_CARD', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (card: string, params?: GetIssuingCardsCardParams) =>
      httpResource<GetIssuingCardsCardResponse>(() => ({
        url: `${base}/v1/issuing/cards/${card}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
