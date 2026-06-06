import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCustomersSearchParams =
  paths['/v1/customers/search']['get']['parameters']['query'];

export type GetCustomersSearchResponse =
  paths['/v1/customers/search']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_SEARCH = new InjectionToken<
  (
    params?:
      | GetCustomersSearchParams
      | (() => GetCustomersSearchParams | undefined),
  ) => ReturnType<typeof httpResource<GetCustomersSearchResponse>>
>('GET_CUSTOMERS_SEARCH', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetCustomersSearchParams
        | (() => GetCustomersSearchParams | undefined),
    ) =>
      httpResource<GetCustomersSearchResponse>(() => ({
        url: `${base}/v1/customers/search`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
