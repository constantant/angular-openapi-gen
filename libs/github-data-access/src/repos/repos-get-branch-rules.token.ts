import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetBranchRulesParams =
  paths['/repos/{owner}/{repo}/rules/branches/{branch}']['get']['parameters']['query'];

export type ReposGetBranchRulesResponse =
  paths['/repos/{owner}/{repo}/rules/branches/{branch}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_BRANCH_RULES = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    params?:
      | ReposGetBranchRulesParams
      | (() => ReposGetBranchRulesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetBranchRulesResponse>>
>('REPOS_GET_BRANCH_RULES');

export function provideReposGetBranchRules(): FactoryProvider {
  return {
    provide: REPOS_GET_BRANCH_RULES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        params?:
          | ReposGetBranchRulesParams
          | (() => ReposGetBranchRulesParams | undefined),
      ) =>
        httpResource<ReposGetBranchRulesResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/rules/branches/${branch}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
