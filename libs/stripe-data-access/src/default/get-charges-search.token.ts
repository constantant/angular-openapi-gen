import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetChargesSearchParams =
  paths['/v1/charges/search']['get']['parameters']['query'];

type GetChargesSearchResponse =
  paths['/v1/charges/search']['get']['responses']['200']['content']['application/json'];

export const GET_CHARGES_SEARCH = new InjectionToken<
  (
    params?: GetChargesSearchParams,
  ) => ReturnType<typeof httpResource<GetChargesSearchResponse>>
>('GET_CHARGES_SEARCH', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetChargesSearchParams) =>
      httpResource<GetChargesSearchResponse>(() => ({
        url: `${base}/v1/charges/search`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
