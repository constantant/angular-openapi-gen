import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdateCommitCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/comments/{comment_id}']['patch']['requestBody']
>['content']['application/json'];

export type ReposUpdateCommitCommentResponse =
  paths['/repos/{owner}/{repo}/comments/{comment_id}']['patch']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_COMMIT_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
    body: ReposUpdateCommitCommentBody | Signal<ReposUpdateCommitCommentBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateCommitCommentResponse>>
>('REPOS_UPDATE_COMMIT_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      commentId: string,
      body: ReposUpdateCommitCommentBody | Signal<ReposUpdateCommitCommentBody>,
    ) =>
      httpResource<ReposUpdateCommitCommentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/comments/${commentId}`,
        method: 'PATCH',
        body,
      }));
  },
});
