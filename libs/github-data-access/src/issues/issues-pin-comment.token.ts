import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesPinCommentResponse =
  paths['/repos/{owner}/{repo}/issues/comments/{comment_id}/pin']['put']['responses']['200']['content']['application/json'];

export const ISSUES_PIN_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
  ) => ReturnType<typeof httpResource<IssuesPinCommentResponse>>
>('ISSUES_PIN_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, commentId: string) =>
      httpResource<IssuesPinCommentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/comments/${commentId}/pin`,
        method: 'PUT',
      }));
  },
});
