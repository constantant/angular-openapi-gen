import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReactionsCreateForPullRequestReviewCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions']['post']['requestBody']
>['content']['application/json'];

export type ReactionsCreateForPullRequestReviewCommentResponse =
  paths['/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions']['post']['responses']['200']['content']['application/json'];

export const REACTIONS_CREATE_FOR_PULL_REQUEST_REVIEW_COMMENT =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      commentId: string,
      body:
        | ReactionsCreateForPullRequestReviewCommentBody
        | Signal<ReactionsCreateForPullRequestReviewCommentBody>,
    ) => ReturnType<
      typeof httpResource<ReactionsCreateForPullRequestReviewCommentResponse>
    >
  >('REACTIONS_CREATE_FOR_PULL_REQUEST_REVIEW_COMMENT');

export function provideReactionsCreateForPullRequestReviewComment(): FactoryProvider {
  return {
    provide: REACTIONS_CREATE_FOR_PULL_REQUEST_REVIEW_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        commentId: string,
        body:
          | ReactionsCreateForPullRequestReviewCommentBody
          | Signal<ReactionsCreateForPullRequestReviewCommentBody>,
      ) =>
        httpResource<ReactionsCreateForPullRequestReviewCommentResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/pulls/comments/${commentId}/reactions`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
