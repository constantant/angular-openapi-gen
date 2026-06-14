import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsDismissReviewBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals']['put']['requestBody']
>['content']['application/json'];

export type PullsDismissReviewResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals']['put']['responses']['200']['content']['application/json'];

export const PULLS_DISMISS_REVIEW = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    reviewId: string,
    body: PullsDismissReviewBody | Signal<PullsDismissReviewBody>,
  ) => ReturnType<typeof httpResource<PullsDismissReviewResponse>>
>('PULLS_DISMISS_REVIEW');

export function providePullsDismissReview(): FactoryProvider {
  return {
    provide: PULLS_DISMISS_REVIEW,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        pullNumber: string,
        reviewId: string,
        body: PullsDismissReviewBody | Signal<PullsDismissReviewBody>,
      ) =>
        httpResource<PullsDismissReviewResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}/dismissals`,
          method: 'PUT',
          body,
        }));
    },
  };
}
