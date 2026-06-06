import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsGetReviewResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}']['get']['responses']['200']['content']['application/json'];

export const PULLS_GET_REVIEW = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    reviewId: string,
  ) => ReturnType<typeof httpResource<PullsGetReviewResponse>>
>('PULLS_GET_REVIEW', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      pullNumber: string,
      reviewId: string,
    ) =>
      httpResource<PullsGetReviewResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}`,
      }));
  },
});
