import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReactionsListForIssueCommentParams =
  paths['/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions']['get']['parameters']['query'];

export type ReactionsListForIssueCommentResponse =
  paths['/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions']['get']['responses']['200']['content']['application/json'];

export const REACTIONS_LIST_FOR_ISSUE_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
    params?:
      | ReactionsListForIssueCommentParams
      | (() => ReactionsListForIssueCommentParams | undefined),
  ) => ReturnType<typeof httpResource<ReactionsListForIssueCommentResponse>>
>('REACTIONS_LIST_FOR_ISSUE_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      commentId: string,
      params?:
        | ReactionsListForIssueCommentParams
        | (() => ReactionsListForIssueCommentParams | undefined),
    ) =>
      httpResource<ReactionsListForIssueCommentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/comments/${commentId}/reactions`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
