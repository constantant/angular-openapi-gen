import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsListReviewCommentsForRepoParams =
  paths['/repos/{owner}/{repo}/pulls/comments']['get']['parameters']['query'];

export type PullsListReviewCommentsForRepoResponse =
  paths['/repos/{owner}/{repo}/pulls/comments']['get']['responses']['200']['content']['application/json'];

export const PULLS_LIST_REVIEW_COMMENTS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | PullsListReviewCommentsForRepoParams
      | (() => PullsListReviewCommentsForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<PullsListReviewCommentsForRepoResponse>>
>('PULLS_LIST_REVIEW_COMMENTS_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | PullsListReviewCommentsForRepoParams
        | (() => PullsListReviewCommentsForRepoParams | undefined),
    ) =>
      httpResource<PullsListReviewCommentsForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/comments`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
