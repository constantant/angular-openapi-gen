import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListCommentsForCommitParams =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/comments']['get']['parameters']['query'];

export type ReposListCommentsForCommitResponse =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/comments']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_COMMENTS_FOR_COMMIT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commitSha: string,
    params?:
      | ReposListCommentsForCommitParams
      | (() => ReposListCommentsForCommitParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListCommentsForCommitResponse>>
>('REPOS_LIST_COMMENTS_FOR_COMMIT');

export function provideReposListCommentsForCommit(): FactoryProvider {
  return {
    provide: REPOS_LIST_COMMENTS_FOR_COMMIT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        commitSha: string,
        params?:
          | ReposListCommentsForCommitParams
          | (() => ReposListCommentsForCommitParams | undefined),
      ) =>
        httpResource<ReposListCommentsForCommitResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/commits/${commitSha}/comments`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
