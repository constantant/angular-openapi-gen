import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsSubmitReviewBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events']['post']['requestBody']
>['content']['application/json'];

export type PullsSubmitReviewResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events']['post']['responses']['200']['content']['application/json'];

export const PULLS_SUBMIT_REVIEW = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    reviewId: string,
    body: PullsSubmitReviewBody | Signal<PullsSubmitReviewBody>,
  ) => ReturnType<typeof httpResource<PullsSubmitReviewResponse>>
>('PULLS_SUBMIT_REVIEW', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      pullNumber: string,
      reviewId: string,
      body: PullsSubmitReviewBody | Signal<PullsSubmitReviewBody>,
    ) =>
      httpResource<PullsSubmitReviewResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}/events`,
        method: 'POST',
        body,
      }));
  },
});
