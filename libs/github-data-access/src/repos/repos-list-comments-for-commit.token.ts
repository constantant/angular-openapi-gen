import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListCommentsForCommitParams =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/comments']['get']['parameters']['query'];

type ReposListCommentsForCommitResponse =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/comments']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_COMMENTS_FOR_COMMIT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commit_sha: string,
    params?: ReposListCommentsForCommitParams,
  ) => ReturnType<typeof httpResource<ReposListCommentsForCommitResponse>>
>('REPOS_LIST_COMMENTS_FOR_COMMIT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      commit_sha: string,
      params?: ReposListCommentsForCommitParams,
    ) =>
      httpResource<ReposListCommentsForCommitResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/commits/${commit_sha}/comments`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
