import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListCommitsParams =
  paths['/repos/{owner}/{repo}/commits']['get']['parameters']['query'];

export type ReposListCommitsResponse =
  paths['/repos/{owner}/{repo}/commits']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_COMMITS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposListCommitsParams
      | (() => ReposListCommitsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListCommitsResponse>>
>('REPOS_LIST_COMMITS');

export function provideReposListCommits(): FactoryProvider {
  return {
    provide: REPOS_LIST_COMMITS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListCommitsParams
          | (() => ReposListCommitsParams | undefined),
      ) =>
        httpResource<ReposListCommitsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/commits`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
