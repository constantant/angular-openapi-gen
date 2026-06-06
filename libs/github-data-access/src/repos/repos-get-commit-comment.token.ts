import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCommitCommentResponse =
  paths['/repos/{owner}/{repo}/comments/{comment_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_COMMIT_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
  ) => ReturnType<typeof httpResource<ReposGetCommitCommentResponse>>
>('REPOS_GET_COMMIT_COMMENT');

export function provideReposGetCommitComment(): FactoryProvider {
  return {
    provide: REPOS_GET_COMMIT_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, commentId: string) =>
        httpResource<ReposGetCommitCommentResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/comments/${commentId}`,
        }));
    },
  };
}
