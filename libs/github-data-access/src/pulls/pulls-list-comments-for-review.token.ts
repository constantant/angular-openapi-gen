import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsListCommentsForReviewParams =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments']['get']['parameters']['query'];

export type PullsListCommentsForReviewResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments']['get']['responses']['200']['content']['application/json'];

export const PULLS_LIST_COMMENTS_FOR_REVIEW = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    reviewId: string,
    params?:
      | PullsListCommentsForReviewParams
      | (() => PullsListCommentsForReviewParams | undefined),
  ) => ReturnType<typeof httpResource<PullsListCommentsForReviewResponse>>
>('PULLS_LIST_COMMENTS_FOR_REVIEW');

export function providePullsListCommentsForReview(): FactoryProvider {
  return {
    provide: PULLS_LIST_COMMENTS_FOR_REVIEW,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        pullNumber: string,
        reviewId: string,
        params?:
          | PullsListCommentsForReviewParams
          | (() => PullsListCommentsForReviewParams | undefined),
      ) =>
        httpResource<PullsListCommentsForReviewResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}/comments`,
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
