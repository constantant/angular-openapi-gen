import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetBranchRulesParams =
  paths['/repos/{owner}/{repo}/rules/branches/{branch}']['get']['parameters']['query'];

type ReposGetBranchRulesResponse =
  paths['/repos/{owner}/{repo}/rules/branches/{branch}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_BRANCH_RULES = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    params?: ReposGetBranchRulesParams,
  ) => ReturnType<typeof httpResource<ReposGetBranchRulesResponse>>
>('REPOS_GET_BRANCH_RULES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      branch: string,
      params?: ReposGetBranchRulesParams,
    ) =>
      httpResource<ReposGetBranchRulesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/rules/branches/${branch}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
