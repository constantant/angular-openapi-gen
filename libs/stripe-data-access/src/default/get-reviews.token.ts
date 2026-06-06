import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetReviewsParams = paths['/v1/reviews']['get']['parameters']['query'];

type GetReviewsResponse =
  paths['/v1/reviews']['get']['responses']['200']['content']['application/json'];

export const GET_REVIEWS = new InjectionToken<
  (
    params?: GetReviewsParams,
  ) => ReturnType<typeof httpResource<GetReviewsResponse>>
>('GET_REVIEWS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetReviewsParams) =>
      httpResource<GetReviewsResponse>(() => ({
        url: `${base}/v1/reviews`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
