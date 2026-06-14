import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
  >('REACTIONS_LIST_FOR_PULL_REQUEST_REVIEW_COMMENT');

export function provideReactionsListForPullRequestReviewComment(): FactoryProvider {
  return {
    provide: REACTIONS_LIST_FOR_PULL_REQUEST_REVIEW_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        commentId: string,
        params?:
          | ReactionsListForPullRequestReviewCommentParams
          | (() => ReactionsListForPullRequestReviewCommentParams | undefined),
      ) =>
        httpResource<ReactionsListForPullRequestReviewCommentResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/pulls/comments/${commentId}/reactions`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
