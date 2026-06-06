import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsListReviewCommentsParams =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/comments']['get']['parameters']['query'];

export type PullsListReviewCommentsResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/comments']['get']['responses']['200']['content']['application/json'];

export const PULLS_LIST_REVIEW_COMMENTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    params?:
      | PullsListReviewCommentsParams
      | (() => PullsListReviewCommentsParams | undefined),
  ) => ReturnType<typeof httpResource<PullsListReviewCommentsResponse>>
>('PULLS_LIST_REVIEW_COMMENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      pullNumber: string,
      params?:
        | PullsListReviewCommentsParams
        | (() => PullsListReviewCommentsParams | undefined),
    ) =>
      httpResource<PullsListReviewCommentsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/comments`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
