import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DELETE_COMMIT_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_COMMIT_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, commentId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/comments/${commentId}`,
        method: 'DELETE',
      }));
  },
});
