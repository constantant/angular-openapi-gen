import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { trackResource } from '../mock-hook';

export type ReposDeleteCommitCommentError =
  paths['/repos/{owner}/{repo}/comments/{comment_id}']['delete']['responses']['404']['content']['application/json'];

export const REPOS_DELETE_COMMIT_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_COMMIT_COMMENT');

export function provideReposDeleteCommitComment(): FactoryProvider {
  return {
    provide: REPOS_DELETE_COMMIT_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, commentId: string) =>
        trackResource(
          'REPOS_DELETE_COMMIT_COMMENT',
          httpResource<unknown>(() => ({
            url: `${base}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/comments/${encodeURIComponent(commentId)}`,
            method: 'DELETE',
          })),
        );
    },
  };
}
