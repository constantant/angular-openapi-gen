import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsUpdateReviewBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}']['put']['requestBody']
>['content']['application/json'];

export type PullsUpdateReviewResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}']['put']['responses']['200']['content']['application/json'];

export const PULLS_UPDATE_REVIEW = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    reviewId: string,
    body: PullsUpdateReviewBody | Signal<PullsUpdateReviewBody>,
  ) => ReturnType<typeof httpResource<PullsUpdateReviewResponse>>
>('PULLS_UPDATE_REVIEW', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      pullNumber: string,
      reviewId: string,
      body: PullsUpdateReviewBody | Signal<PullsUpdateReviewBody>,
    ) =>
      httpResource<PullsUpdateReviewResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}`,
        method: 'PUT',
        body,
      }));
  },
});
