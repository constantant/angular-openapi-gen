import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetIssuingCardsParams =
  paths['/v1/issuing/cards']['get']['parameters']['query'];

type GetIssuingCardsResponse =
  paths['/v1/issuing/cards']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_CARDS = new InjectionToken<
  (
    params?: GetIssuingCardsParams,
  ) => ReturnType<typeof httpResource<GetIssuingCardsResponse>>
>('GET_ISSUING_CARDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetIssuingCardsParams) =>
      httpResource<GetIssuingCardsResponse>(() => ({
        url: `${base}/v1/issuing/cards`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
