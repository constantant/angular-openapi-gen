import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsCreateReplyForReviewCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies']['post']['requestBody']
>['content']['application/json'];

export type PullsCreateReplyForReviewCommentResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies']['post']['responses']['201']['content']['application/json'];

export const PULLS_CREATE_REPLY_FOR_REVIEW_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    commentId: string,
    body:
      | PullsCreateReplyForReviewCommentBody
      | Signal<PullsCreateReplyForReviewCommentBody>,
  ) => ReturnType<typeof httpResource<PullsCreateReplyForReviewCommentResponse>>
>('PULLS_CREATE_REPLY_FOR_REVIEW_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      pullNumber: string,
      commentId: string,
      body:
        | PullsCreateReplyForReviewCommentBody
        | Signal<PullsCreateReplyForReviewCommentBody>,
    ) =>
      httpResource<PullsCreateReplyForReviewCommentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/comments/${commentId}/replies`,
        method: 'POST',
        body,
      }));
  },
});
