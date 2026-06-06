import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingCardholdersParams =
  paths['/v1/issuing/cardholders']['get']['parameters']['query'];

export type GetIssuingCardholdersResponse =
  paths['/v1/issuing/cardholders']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_CARDHOLDERS = new InjectionToken<
  (
    params?:
      | GetIssuingCardholdersParams
      | (() => GetIssuingCardholdersParams | undefined),
  ) => ReturnType<typeof httpResource<GetIssuingCardholdersResponse>>
>('GET_ISSUING_CARDHOLDERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetIssuingCardholdersParams
        | (() => GetIssuingCardholdersParams | undefined),
    ) =>
      httpResource<GetIssuingCardholdersResponse>(() => ({
        url: `${base}/v1/issuing/cardholders`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
