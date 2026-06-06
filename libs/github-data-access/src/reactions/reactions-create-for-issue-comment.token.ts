import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReactionsCreateForIssueCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions']['post']['requestBody']
>['content']['application/json'];

export type ReactionsCreateForIssueCommentResponse =
  paths['/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions']['post']['responses']['200']['content']['application/json'];

export const REACTIONS_CREATE_FOR_ISSUE_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
    body:
      | ReactionsCreateForIssueCommentBody
      | Signal<ReactionsCreateForIssueCommentBody>,
  ) => ReturnType<typeof httpResource<ReactionsCreateForIssueCommentResponse>>
>('REACTIONS_CREATE_FOR_ISSUE_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      commentId: string,
      body:
        | ReactionsCreateForIssueCommentBody
        | Signal<ReactionsCreateForIssueCommentBody>,
    ) =>
      httpResource<ReactionsCreateForIssueCommentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/comments/${commentId}/reactions`,
        method: 'POST',
        body,
      }));
  },
});
