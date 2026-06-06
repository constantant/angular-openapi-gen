import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetRepoRulesetParams =
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}']['get']['parameters']['query'];

type ReposGetRepoRulesetResponse =
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_REPO_RULESET = new InjectionToken<
  (
    owner: string,
    repo: string,
    ruleset_id: string,
    params?: ReposGetRepoRulesetParams,
  ) => ReturnType<typeof httpResource<ReposGetRepoRulesetResponse>>
>('REPOS_GET_REPO_RULESET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      ruleset_id: string,
      params?: ReposGetRepoRulesetParams,
    ) =>
      httpResource<ReposGetRepoRulesetResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/rulesets/${ruleset_id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
