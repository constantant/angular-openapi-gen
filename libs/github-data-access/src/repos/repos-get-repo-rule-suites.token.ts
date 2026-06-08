import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetRepoRuleSuitesParams =
  paths['/repos/{owner}/{repo}/rulesets/rule-suites']['get']['parameters']['query'];

export type ReposGetRepoRuleSuitesResponse =
  paths['/repos/{owner}/{repo}/rulesets/rule-suites']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_REPO_RULE_SUITES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposGetRepoRuleSuitesParams
      | (() => ReposGetRepoRuleSuitesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetRepoRuleSuitesResponse>>
>('REPOS_GET_REPO_RULE_SUITES');

export function provideReposGetRepoRuleSuites(): FactoryProvider {
  return {
    provide: REPOS_GET_REPO_RULE_SUITES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposGetRepoRuleSuitesParams
          | (() => ReposGetRepoRuleSuitesParams | undefined),
      ) =>
        httpResource<ReposGetRepoRuleSuitesResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/rulesets/rule-suites`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
