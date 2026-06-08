import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCompareCommitsParams =
  paths['/repos/{owner}/{repo}/compare/{basehead}']['get']['parameters']['query'];

export type ReposCompareCommitsResponse =
  paths['/repos/{owner}/{repo}/compare/{basehead}']['get']['responses']['200']['content']['application/json'];

export const REPOS_COMPARE_COMMITS = new InjectionToken<
  (
    owner: string,
    repo: string,
    basehead: string,
    params?:
      | ReposCompareCommitsParams
      | (() => ReposCompareCommitsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposCompareCommitsResponse>>
>('REPOS_COMPARE_COMMITS');

export function provideReposCompareCommits(): FactoryProvider {
  return {
    provide: REPOS_COMPARE_COMMITS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        basehead: string,
        params?:
          | ReposCompareCommitsParams
          | (() => ReposCompareCommitsParams | undefined),
      ) =>
        httpResource<ReposCompareCommitsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/compare/${basehead}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
