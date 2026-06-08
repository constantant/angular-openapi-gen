import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListForRepoParams =
  paths['/repos/{owner}/{repo}/issues']['get']['parameters']['query'];

export type IssuesListForRepoResponse =
  paths['/repos/{owner}/{repo}/issues']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | IssuesListForRepoParams
      | (() => IssuesListForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListForRepoResponse>>
>('ISSUES_LIST_FOR_REPO');

export function provideIssuesListForRepo(): FactoryProvider {
  return {
    provide: ISSUES_LIST_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | IssuesListForRepoParams
          | (() => IssuesListForRepoParams | undefined),
      ) =>
        httpResource<IssuesListForRepoResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/issues`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
