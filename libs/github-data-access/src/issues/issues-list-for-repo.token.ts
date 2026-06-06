import { InjectionToken, inject } from '@angular/core';
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
>('ISSUES_LIST_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | IssuesListForRepoParams
        | (() => IssuesListForRepoParams | undefined),
    ) =>
      httpResource<IssuesListForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
