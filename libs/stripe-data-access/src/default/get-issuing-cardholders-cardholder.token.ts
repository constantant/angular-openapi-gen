import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingCardholdersCardholderParams =
  paths['/v1/issuing/cardholders/{cardholder}']['get']['parameters']['query'];

export type GetIssuingCardholdersCardholderResponse =
  paths['/v1/issuing/cardholders/{cardholder}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_CARDHOLDERS_CARDHOLDER = new InjectionToken<
  (
    cardholder: string,
    params?:
      | GetIssuingCardholdersCardholderParams
      | (() => GetIssuingCardholdersCardholderParams | undefined),
  ) => ReturnType<typeof httpResource<GetIssuingCardholdersCardholderResponse>>
>('GET_ISSUING_CARDHOLDERS_CARDHOLDER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      cardholder: string,
      params?:
        | GetIssuingCardholdersCardholderParams
        | (() => GetIssuingCardholdersCardholderParams | undefined),
    ) =>
      httpResource<GetIssuingCardholdersCardholderResponse>(() => ({
        url: `${base}/v1/issuing/cardholders/${cardholder}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
