import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListCommitCommentsForRepoParams =
  paths['/repos/{owner}/{repo}/comments']['get']['parameters']['query'];

export type ReposListCommitCommentsForRepoResponse =
  paths['/repos/{owner}/{repo}/comments']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_COMMIT_COMMENTS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposListCommitCommentsForRepoParams
      | (() => ReposListCommitCommentsForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListCommitCommentsForRepoResponse>>
>('REPOS_LIST_COMMIT_COMMENTS_FOR_REPO');

export function provideReposListCommitCommentsForRepo(): FactoryProvider {
  return {
    provide: REPOS_LIST_COMMIT_COMMENTS_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListCommitCommentsForRepoParams
          | (() => ReposListCommitCommentsForRepoParams | undefined),
      ) =>
        httpResource<ReposListCommitCommentsForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/comments`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
