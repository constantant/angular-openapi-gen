import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostReviewsReviewApproveBody = NonNullable<
  paths['/v1/reviews/{review}/approve']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostReviewsReviewApproveResponse =
  paths['/v1/reviews/{review}/approve']['post']['responses']['200']['content']['application/json'];

export const POST_REVIEWS_REVIEW_APPROVE = new InjectionToken<
  (
    review: string,
    body: PostReviewsReviewApproveBody | Signal<PostReviewsReviewApproveBody>,
  ) => ReturnType<typeof httpResource<PostReviewsReviewApproveResponse>>
>('POST_REVIEWS_REVIEW_APPROVE');

export function providePostReviewsReviewApprove(): FactoryProvider {
  return {
    provide: POST_REVIEWS_REVIEW_APPROVE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        review: string,
        body:
          | PostReviewsReviewApproveBody
          | Signal<PostReviewsReviewApproveBody>,
      ) =>
        httpResource<PostReviewsReviewApproveResponse>(() => ({
          url: `${base}/v1/reviews/${review}/approve`,
          method: 'POST',
          body,
        }));
    },
  };
}
