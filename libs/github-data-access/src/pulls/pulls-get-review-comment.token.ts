import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsGetReviewCommentResponse =
  paths['/repos/{owner}/{repo}/pulls/comments/{comment_id}']['get']['responses']['200']['content']['application/json'];

export const PULLS_GET_REVIEW_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
  ) => ReturnType<typeof httpResource<PullsGetReviewCommentResponse>>
>('PULLS_GET_REVIEW_COMMENT');

export function providePullsGetReviewComment(): FactoryProvider {
  return {
    provide: PULLS_GET_REVIEW_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, commentId: string) =>
        httpResource<PullsGetReviewCommentResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/pulls/comments/${commentId}`,
        }));
    },
  };
}
