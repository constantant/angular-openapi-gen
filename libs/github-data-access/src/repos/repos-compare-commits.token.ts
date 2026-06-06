import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposCompareCommitsParams =
  paths['/repos/{owner}/{repo}/compare/{basehead}']['get']['parameters']['query'];

type ReposCompareCommitsResponse =
  paths['/repos/{owner}/{repo}/compare/{basehead}']['get']['responses']['200']['content']['application/json'];

export const REPOS_COMPARE_COMMITS = new InjectionToken<
  (
    owner: string,
    repo: string,
    basehead: string,
    params?: ReposCompareCommitsParams,
  ) => ReturnType<typeof httpResource<ReposCompareCommitsResponse>>
>('REPOS_COMPARE_COMMITS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      basehead: string,
      params?: ReposCompareCommitsParams,
    ) =>
      httpResource<ReposCompareCommitsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/compare/${basehead}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
