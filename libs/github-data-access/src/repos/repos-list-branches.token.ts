import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListBranchesParams =
  paths['/repos/{owner}/{repo}/branches']['get']['parameters']['query'];

type ReposListBranchesResponse =
  paths['/repos/{owner}/{repo}/branches']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_BRANCHES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListBranchesParams,
  ) => ReturnType<typeof httpResource<ReposListBranchesResponse>>
>('REPOS_LIST_BRANCHES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, params?: ReposListBranchesParams) =>
      httpResource<ReposListBranchesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
