import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListBranchesParams =
  paths['/repos/{owner}/{repo}/branches']['get']['parameters']['query'];

export type ReposListBranchesResponse =
  paths['/repos/{owner}/{repo}/branches']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_BRANCHES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposListBranchesParams
      | (() => ReposListBranchesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListBranchesResponse>>
>('REPOS_LIST_BRANCHES');

export function provideReposListBranches(): FactoryProvider {
  return {
    provide: REPOS_LIST_BRANCHES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListBranchesParams
          | (() => ReposListBranchesParams | undefined),
      ) =>
        httpResource<ReposListBranchesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches`,
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
