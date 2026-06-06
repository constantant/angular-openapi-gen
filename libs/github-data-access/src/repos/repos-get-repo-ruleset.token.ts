import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetRepoRulesetParams =
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}']['get']['parameters']['query'];

export type ReposGetRepoRulesetResponse =
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_REPO_RULESET = new InjectionToken<
  (
    owner: string,
    repo: string,
    rulesetId: string,
    params?:
      | ReposGetRepoRulesetParams
      | (() => ReposGetRepoRulesetParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetRepoRulesetResponse>>
>('REPOS_GET_REPO_RULESET');

export function provideReposGetRepoRuleset(): FactoryProvider {
  return {
    provide: REPOS_GET_REPO_RULESET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        rulesetId: string,
        params?:
          | ReposGetRepoRulesetParams
          | (() => ReposGetRepoRulesetParams | undefined),
      ) =>
        httpResource<ReposGetRepoRulesetResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/rulesets/${rulesetId}`,
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
