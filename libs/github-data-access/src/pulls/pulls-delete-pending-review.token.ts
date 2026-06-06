import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsDeletePendingReviewResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}']['delete']['responses']['200']['content']['application/json'];

export const PULLS_DELETE_PENDING_REVIEW = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    reviewId: string,
  ) => ReturnType<typeof httpResource<PullsDeletePendingReviewResponse>>
>('PULLS_DELETE_PENDING_REVIEW', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      pullNumber: string,
      reviewId: string,
    ) =>
      httpResource<PullsDeletePendingReviewResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}`,
        method: 'DELETE',
      }));
  },
});
