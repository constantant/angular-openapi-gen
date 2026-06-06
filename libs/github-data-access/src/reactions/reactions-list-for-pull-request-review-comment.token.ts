import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReactionsListForPullRequestReviewCommentParams =
  paths['/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions']['get']['parameters']['query'];

export type ReactionsListForPullRequestReviewCommentResponse =
  paths['/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions']['get']['responses']['200']['content']['application/json'];

export const REACTIONS_LIST_FOR_PULL_REQUEST_REVIEW_COMMENT =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      commentId: string,
      params?:
        | ReactionsListForPullRequestReviewCommentParams
        | (() => ReactionsListForPullRequestReviewCommentParams | undefined),
    ) => ReturnType<
      typeof httpResource<ReactionsListForPullRequestReviewCommentResponse>
    >
  >('REACTIONS_LIST_FOR_PULL_REQUEST_REVIEW_COMMENT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        commentId: string,
        params?:
          | ReactionsListForPullRequestReviewCommentParams
          | (() => ReactionsListForPullRequestReviewCommentParams | undefined),
      ) =>
        httpResource<ReactionsListForPullRequestReviewCommentResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/pulls/comments/${commentId}/reactions`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  });
