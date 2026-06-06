import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetRepoRulesetHistoryParams =
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}/history']['get']['parameters']['query'];

export type ReposGetRepoRulesetHistoryResponse =
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}/history']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_REPO_RULESET_HISTORY = new InjectionToken<
  (
    owner: string,
    repo: string,
    rulesetId: string,
    params?:
      | ReposGetRepoRulesetHistoryParams
      | (() => ReposGetRepoRulesetHistoryParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetRepoRulesetHistoryResponse>>
>('REPOS_GET_REPO_RULESET_HISTORY');

export function provideReposGetRepoRulesetHistory(): FactoryProvider {
  return {
    provide: REPOS_GET_REPO_RULESET_HISTORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        rulesetId: string,
        params?:
          | ReposGetRepoRulesetHistoryParams
          | (() => ReposGetRepoRulesetHistoryParams | undefined),
      ) =>
        httpResource<ReposGetRepoRulesetHistoryResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/rulesets/${rulesetId}/history`,
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
