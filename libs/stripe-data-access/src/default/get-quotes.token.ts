import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetQuotesParams = paths['/v1/quotes']['get']['parameters']['query'];

type GetQuotesResponse =
  paths['/v1/quotes']['get']['responses']['200']['content']['application/json'];

export const GET_QUOTES = new InjectionToken<
  (
    params?: GetQuotesParams,
  ) => ReturnType<typeof httpResource<GetQuotesResponse>>
>('GET_QUOTES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetQuotesParams) =>
      httpResource<GetQuotesResponse>(() => ({
        url: `${base}/v1/quotes`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
