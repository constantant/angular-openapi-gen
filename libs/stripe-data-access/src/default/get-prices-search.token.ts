import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPricesSearchParams =
  paths['/v1/prices/search']['get']['parameters']['query'];

type GetPricesSearchResponse =
  paths['/v1/prices/search']['get']['responses']['200']['content']['application/json'];

export const GET_PRICES_SEARCH = new InjectionToken<
  (
    params?: GetPricesSearchParams,
  ) => ReturnType<typeof httpResource<GetPricesSearchResponse>>
>('GET_PRICES_SEARCH', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetPricesSearchParams) =>
      httpResource<GetPricesSearchResponse>(() => ({
        url: `${base}/v1/prices/search`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
