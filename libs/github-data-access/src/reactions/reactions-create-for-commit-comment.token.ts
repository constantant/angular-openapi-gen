import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReactionsCreateForCommitCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/comments/{comment_id}/reactions']['post']['requestBody']
>['content']['application/json'];

export type ReactionsCreateForCommitCommentResponse =
  paths['/repos/{owner}/{repo}/comments/{comment_id}/reactions']['post']['responses']['200']['content']['application/json'];

export const REACTIONS_CREATE_FOR_COMMIT_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
    body:
      | ReactionsCreateForCommitCommentBody
      | Signal<ReactionsCreateForCommitCommentBody>,
  ) => ReturnType<typeof httpResource<ReactionsCreateForCommitCommentResponse>>
>('REACTIONS_CREATE_FOR_COMMIT_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      commentId: string,
      body:
        | ReactionsCreateForCommitCommentBody
        | Signal<ReactionsCreateForCommitCommentBody>,
    ) =>
      httpResource<ReactionsCreateForCommitCommentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/comments/${commentId}/reactions`,
        method: 'POST',
        body,
      }));
  },
});
