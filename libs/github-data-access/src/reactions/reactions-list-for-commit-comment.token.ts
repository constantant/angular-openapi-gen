import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReactionsListForCommitCommentParams =
  paths['/repos/{owner}/{repo}/comments/{comment_id}/reactions']['get']['parameters']['query'];

export type ReactionsListForCommitCommentResponse =
  paths['/repos/{owner}/{repo}/comments/{comment_id}/reactions']['get']['responses']['200']['content']['application/json'];

export const REACTIONS_LIST_FOR_COMMIT_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
    params?:
      | ReactionsListForCommitCommentParams
      | (() => ReactionsListForCommitCommentParams | undefined),
  ) => ReturnType<typeof httpResource<ReactionsListForCommitCommentResponse>>
>('REACTIONS_LIST_FOR_COMMIT_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      commentId: string,
      params?:
        | ReactionsListForCommitCommentParams
        | (() => ReactionsListForCommitCommentParams | undefined),
    ) =>
      httpResource<ReactionsListForCommitCommentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/comments/${commentId}/reactions`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
