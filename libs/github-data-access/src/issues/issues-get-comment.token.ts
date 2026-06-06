import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesGetCommentResponse =
  paths['/repos/{owner}/{repo}/issues/comments/{comment_id}']['get']['responses']['200']['content']['application/json'];

export const ISSUES_GET_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
  ) => ReturnType<typeof httpResource<IssuesGetCommentResponse>>
>('ISSUES_GET_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, commentId: string) =>
      httpResource<IssuesGetCommentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/comments/${commentId}`,
      }));
  },
});
