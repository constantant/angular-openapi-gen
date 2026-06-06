import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesUpdateCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/comments/{comment_id}']['patch']['requestBody']
>['content']['application/json'];

export type IssuesUpdateCommentResponse =
  paths['/repos/{owner}/{repo}/issues/comments/{comment_id}']['patch']['responses']['200']['content']['application/json'];

export const ISSUES_UPDATE_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
    body: IssuesUpdateCommentBody | Signal<IssuesUpdateCommentBody>,
  ) => ReturnType<typeof httpResource<IssuesUpdateCommentResponse>>
>('ISSUES_UPDATE_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      commentId: string,
      body: IssuesUpdateCommentBody | Signal<IssuesUpdateCommentBody>,
    ) =>
      httpResource<IssuesUpdateCommentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/comments/${commentId}`,
        method: 'PATCH',
        body,
      }));
  },
});
