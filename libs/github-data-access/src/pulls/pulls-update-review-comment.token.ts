import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsUpdateReviewCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/comments/{comment_id}']['patch']['requestBody']
>['content']['application/json'];

export type PullsUpdateReviewCommentResponse =
  paths['/repos/{owner}/{repo}/pulls/comments/{comment_id}']['patch']['responses']['200']['content']['application/json'];

export const PULLS_UPDATE_REVIEW_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
    body: PullsUpdateReviewCommentBody | Signal<PullsUpdateReviewCommentBody>,
  ) => ReturnType<typeof httpResource<PullsUpdateReviewCommentResponse>>
>('PULLS_UPDATE_REVIEW_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      commentId: string,
      body: PullsUpdateReviewCommentBody | Signal<PullsUpdateReviewCommentBody>,
    ) =>
      httpResource<PullsUpdateReviewCommentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/comments/${commentId}`,
        method: 'PATCH',
        body,
      }));
  },
});
