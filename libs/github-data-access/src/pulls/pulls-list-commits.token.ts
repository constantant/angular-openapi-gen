import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsListCommitsParams =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/commits']['get']['parameters']['query'];

export type PullsListCommitsResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/commits']['get']['responses']['200']['content']['application/json'];

export const PULLS_LIST_COMMITS = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    params?:
      | PullsListCommitsParams
      | (() => PullsListCommitsParams | undefined),
  ) => ReturnType<typeof httpResource<PullsListCommitsResponse>>
>('PULLS_LIST_COMMITS');

export function providePullsListCommits(): FactoryProvider {
  return {
    provide: PULLS_LIST_COMMITS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        pullNumber: string,
        params?:
          | PullsListCommitsParams
          | (() => PullsListCommitsParams | undefined),
      ) =>
        httpResource<PullsListCommitsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/commits`,
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
