import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetReviewsReviewParams =
  paths['/v1/reviews/{review}']['get']['parameters']['query'];

export type GetReviewsReviewResponse =
  paths['/v1/reviews/{review}']['get']['responses']['200']['content']['application/json'];

export const GET_REVIEWS_REVIEW = new InjectionToken<
  (
    review: string,
    params?:
      | GetReviewsReviewParams
      | (() => GetReviewsReviewParams | undefined),
  ) => ReturnType<typeof httpResource<GetReviewsReviewResponse>>
>('GET_REVIEWS_REVIEW');

export function provideGetReviewsReview(): FactoryProvider {
  return {
    provide: GET_REVIEWS_REVIEW,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        review: string,
        params?:
          | GetReviewsReviewParams
          | (() => GetReviewsReviewParams | undefined),
      ) =>
        httpResource<GetReviewsReviewResponse>(() => ({
          url: `${base}/v1/reviews/${review}`,
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
